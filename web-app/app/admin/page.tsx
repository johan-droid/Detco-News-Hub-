"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Lock, LogOut, Plus, Image as ImageIcon, Trash2, Edit, Save, X, Upload } from "lucide-react";
import BackButton from "@/components/BackButton";
import { sanitizeInput, sanitizeHTML, validateTitle, validateContent, validateCategory } from "@/lib/security";

type Post = {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    author: string;
    created_at: string;
    updated_at?: string;
};

const CATEGORIES = Object.freeze(["BREAKING", "MANGA", "ANIME", "THEORY", "EVENTS", "GENERAL"] as const);
const INITIAL_FORM_STATE = Object.freeze({
    title: "" as string,
    content: "" as string,
    category: "BREAKING" as const,
    image: "" as string,
    author: "Gosho Aoyama" as string,
});

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [loginSecret, setLoginSecret] = useState("");
    const [loginError, setLoginError] = useState("");

    const router = useRouter();

    const fetchPosts = useCallback(async () => {
        const { data, error } = await supabase
            .from("news")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error("Error fetching posts:", error);
        else setPosts(data || []);
    }, []);

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        const email = "admin@detco-internal.com";
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: loginSecret,
        });

        if (error) {
            setLoginError("Invalid credentials");
        }
        // Clear the password input for security
        setLoginSecret("");
    }, [loginSecret]);

    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }, [router]);

    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('news-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('news-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image: publicUrl }));
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    }, []);

    const resetForm = useCallback(() => {
        setEditingId(null);
        setFormData(INITIAL_FORM_STATE);
    }, []);

    const handleSave = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('Form data being saved:', formData);

        // Validate inputs
        const titleValidation = validateTitle(formData.title);
        if (!titleValidation.valid) {
            return alert(titleValidation.error);
        }

        const contentValidation = validateContent(formData.content);
        if (!contentValidation.valid) {
            return alert(contentValidation.error);
        }

        const categoryValidation = validateCategory(formData.category);
        if (!categoryValidation.valid) {
            return alert(categoryValidation.error);
        }

        // Sanitize inputs
        const validCategories = ['BREAKING', 'MANGA', 'ANIME', 'THEORY', 'EVENTS', 'GENERAL'];
        const sanitizedCategory = formData.category.toUpperCase().trim();
        
        if (!validCategories.includes(sanitizedCategory)) {
            return alert(`Invalid category: ${formData.category}. Must be one of: ${validCategories.join(', ')}`);
        }

        const payload = {
            title: sanitizeInput(formData.title),
            content: sanitizeHTML(formData.content),
            category: sanitizedCategory,
            image: sanitizeInput(formData.image),
            author: sanitizeInput(formData.author),
        };
        
        console.log('Sanitized payload:', payload);

        let error;
        if (editingId) {
            // Update existing post with updated_at timestamp
            console.log('Updating post:', editingId, 'with payload:', payload);
            
            const { data, error: err } = await supabase
                .from("news")
                .update({ 
                    title: payload.title,
                    content: payload.content,
                    category: sanitizedCategory,
                    image: payload.image,
                    author: payload.author
                })
                .eq("id", editingId)
                .select();
                
            error = err;
            console.log('Update response:', { data, error });
        } else {
            const { error: err } = await supabase
                .from("news")
                .insert([payload]);
            error = err;
        }

        if (error) {
            console.error('Detailed error:', error);
            alert("Error saving: " + error.message + (error.details ? " - " + error.details : ""));
        } else {
            console.log('Save successful');
            resetForm();
            fetchPosts();
        }
    }, [formData, editingId, resetForm, fetchPosts]);

    const handleEdit = useCallback((post: Post) => {
        setEditingId(post.id);
        setFormData({
            title: post.title,
            content: post.content,
            category: post.category as typeof INITIAL_FORM_STATE.category,
            image: post.image,
            author: post.author,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm("Are you sure you want to archive this case file?")) return;

        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) alert("Error deleting: " + error.message);
        else fetchPosts();
    }, [fetchPosts]);

    const postsList = useMemo(() => posts, [posts]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (session) fetchPosts();
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchPosts();
        });

        // Auto-logout on page visibility change (tab switch, minimize, etc.)
        const handleVisibilityChange = () => {
            if (document.hidden && session) {
                supabase.auth.signOut();
            }
        };

        // Auto-logout when page is about to unload (close tab, navigate away)
        const handleBeforeUnload = () => {
            if (session) {
                supabase.auth.signOut();
            }
        };

        // Auto-logout after 15 minutes of inactivity
        let inactivityTimer: NodeJS.Timeout;
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                if (session) {
                    supabase.auth.signOut();
                    alert("Session expired due to inactivity. Please log in again.");
                }
            }, 15 * 60 * 1000); // 15 minutes
        };

        // Track user activity
        const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        activityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer);
        });

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Start inactivity timer
        if (session) resetInactivityTimer();

        return () => {
            subscription.unsubscribe();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            activityEvents.forEach(event => {
                document.removeEventListener(event, resetInactivityTimer);
            });
            clearTimeout(inactivityTimer);
        };
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-ink text-gold font-mono">Loading Console...</div>;

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ink p-4">
                <div className="w-full max-w-md bg-card border border-gold/30 p-6 sm:p-8 shadow-2xl">
                    <div className="flex justify-center mb-6 text-gold">
                        <Lock size={48} />
                    </div>
                    <h2 className="text-center font-display font-bold text-xl sm:text-2xl text-white mb-8 tracking-wide">RESTRICTED ACCESS</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-mono text-xs text-gold uppercase tracking-widest mb-2">Security Key</label>
                            <input
                                type="password"
                                value={loginSecret}
                                onChange={(e) => setLoginSecret(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 text-white p-3 focus:border-gold outline-none transition-colors font-mono text-sm"
                                placeholder="Enter Access Key"
                            />
                        </div>
                        {loginError && <p className="text-red text-xs font-mono">{loginError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-gold text-ink font-mono font-bold py-3 sm:py-4 uppercase tracking-widest hover:bg-gold-light transition-colors text-sm"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ink text-white p-4 sm:p-6 md:p-12 font-body">
            <BackButton className="mb-4 sm:mb-6" text="Back to Site" />

            <div className="max-w-5xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 sm:pb-6 mb-8 sm:mb-12 gap-4">
                    <h1 className="font-display font-bold text-2xl sm:text-3xl">DetCo News Console</h1>
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => router.push("/")}
                            className="text-gold hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            ← Back to Home
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red/10 text-red border border-red/20 px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-red hover:text-white transition-colors min-h-[44px]"
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </header>

                {/* EDITOR */}
                <div className="bg-card border border-white/10 p-4 sm:p-6 md:p-8 mb-12 sm:mb-16 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                        {editingId ? "Edit Case File" : "New Case File"}
                    </h3>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Headline</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none text-sm sm:text-base min-h-[44px]"
                                    placeholder="e.g. Black Organization Sighting..."
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof INITIAL_FORM_STATE.category })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none appearance-none text-sm sm:text-base min-h-[44px]"
                                >
                                    <option value="BREAKING">BREAKING</option>
                                    <option value="MANGA">MANGA</option>
                                    <option value="ANIME">ANIME</option>
                                    <option value="THEORY">THEORY</option>
                                    <option value="EVENTS">EVENTS</option>
                                    <option value="GENERAL">GENERAL</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Editor Name</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none text-sm sm:text-base min-h-[44px]"
                                    placeholder="e.g. Conan Edogawa"
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Evidence (Image)</label>
                                <label className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-4 py-3 w-full justify-center font-mono text-xs uppercase hover:bg-accent hover:text-white transition-colors cursor-pointer min-h-[44px]">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                    {uploading ? (
                                        <>
                                            <Upload size={16} className="animate-pulse" /> Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon size={16} /> Upload Evidence
                                        </>
                                    )}
                                </label>
                                {formData.image && (
                                    <div className="mt-2 text-xs text-gold truncate" title={formData.image}>
                                        ✓ Image uploaded
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block font-mono text-xs text-muted uppercase mb-2">Report Details</label>
                            <textarea
                                rows={6}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none resize-none text-sm sm:text-base"
                                placeholder="Full report content..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-gold text-ink font-mono font-bold py-3 px-6 sm:px-8 uppercase tracking-widest hover:bg-gold-light transition-colors flex items-center justify-center gap-2 min-h-[44px] text-sm"
                            >
                                <Save size={16} /> {editingId ? "Update Report" : "Publish Report"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-white/5 text-muted hover:text-white font-mono font-bold py-3 px-6 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 min-h-[44px] text-sm"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                {/* LIST */}
                <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-4 sm:mb-6">Archived Files</h3>
                <div className="space-y-3 sm:space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-card/50 border border-white/5 p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 group hover:border-gold/20 transition-colors">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                    <span className="text-[10px] font-mono text-gold border border-gold/20 px-2 py-0.5 uppercase whitespace-nowrap">{post.category}</span>
                                    <h4 className="font-bold text-base sm:text-lg break-words">{post.title}</h4>
                                </div>
                                <div className="text-xs text-muted font-mono">
                                    {new Date(post.created_at).toLocaleDateString()} by {post.author || 'Unknown'}
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3 self-end sm:self-center">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="p-3 text-accent hover:bg-accent/10 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="p-3 text-red hover:bg-red/10 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    title="Archive"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-12 text-muted font-mono text-sm border border-white/5 border-dashed">
                            No case files found in the archive.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
