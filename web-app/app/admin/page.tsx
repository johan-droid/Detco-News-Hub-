"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Lock, LogOut, Plus, Image as ImageIcon, Trash2, Edit, Save, X } from "lucide-react";

type Post = {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    author: string;
    created_at: string;
};

declare global {
    interface Window {
        cloudinary: any;
    }
}

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "BREAKING",
        image: "",
        author: "",
    });

    const [loginSecret, setLoginSecret] = useState("");
    const [loginError, setLoginError] = useState("");

    const router = useRouter();

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

        return () => subscription.unsubscribe();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("news")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error("Error fetching posts:", error);
        else setPosts(data || []);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        // by using a specific admin email + the secret as password.
        // We use a fixed internal email so the user only deals with the "Security Key".
        const email = "admin@detco-internal.com";
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: loginSecret,
        });

        if (error) {
            setLoginError(error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/"); // Redirect to Home (News Portal)
        router.refresh();
    };

    const openWidget = () => {
        if (window.cloudinary) {
            window.cloudinary.createUploadWidget(
                {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                    sources: ["local", "url"],
                    multiple: false,
                },
                (error: any, result: any) => {
                    if (!error && result && result.event === "success") {
                        setFormData({ ...formData, image: result.info.secure_url });
                    }
                }
            ).open();
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: "",
            content: "",
            category: "BREAKING",
            image: "",
            author: "",
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return alert("Title and Content are required");

        const payload = { ...formData };

        let error;
        if (editingId) {
            const { error: err } = await supabase
                .from("news")
                .update(payload)
                .eq("id", editingId);
            error = err;
        } else {
            const { error: err } = await supabase
                .from("news")
                .insert([payload]);
            error = err;
        }

        if (error) {
            alert("Error saving: " + error.message);
        } else {
            resetForm();
            fetchPosts();
        }
    };

    const handleEdit = (post: Post) => {
        setEditingId(post.id);
        setFormData({
            title: post.title,
            content: post.content,
            category: post.category,
            image: post.image,
            author: post.author,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to archive this case file?")) return;

        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) alert("Error deleting: " + error.message);
        else fetchPosts();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-ink text-gold font-mono">Loading Console...</div>;

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ink p-4">
                <div className="w-full max-w-md bg-card border border-gold/30 p-8 shadow-2xl">
                    <div className="flex justify-center mb-6 text-gold">
                        <Lock size={48} />
                    </div>
                    <h2 className="text-center font-display font-bold text-2xl text-white mb-8 tracking-wide">RESTRICTED ACCESS</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-mono text-xs text-gold uppercase tracking-widest mb-2">Security Key</label>
                            <input
                                type="password"
                                value={loginSecret}
                                onChange={(e) => setLoginSecret(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 text-white p-3 focus:border-gold outline-none transition-colors font-mono"
                                placeholder="Enter Access Key"
                            />
                        </div>
                        {loginError && <p className="text-red text-xs font-mono">{loginError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-gold text-ink font-mono font-bold py-3 uppercase tracking-widest hover:bg-gold-light transition-colors"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ink text-white p-6 md:p-12 font-body">
            <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />

            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center border-b border-white/10 pb-6 mb-12">
                    <h1 className="font-display font-bold text-3xl">DetCo News Console</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="text-gold hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            ← Back to Home
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red/10 text-red border border-red/20 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-red hover:text-white transition-colors"
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </header>

                {/* EDITOR */}
                <div className="bg-card border border-white/10 p-8 mb-16 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                        {editingId ? "Edit Case File" : "New Case File"}
                    </h3>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Headline</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none"
                                    placeholder="e.g. Black Organization Sighting..."
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none appearance-none"
                                >
                                    <option value="BREAKING">BREAKING</option>
                                    <option value="MANGA">MANGA</option>
                                    <option value="ANIME">ANIME</option>
                                    <option value="THEORY">THEORY</option>
                                    <option value="EVENTS">EVENTS</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Editor Name</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none"
                                    placeholder="e.g. Conan Edogawa"
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs text-muted uppercase mb-2">Evidence (Image)</label>
                                <button
                                    type="button"
                                    onClick={openWidget}
                                    className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-4 py-3 w-full justify-center font-mono text-xs uppercase hover:bg-accent hover:text-white transition-colors"
                                >
                                    <ImageIcon size={16} /> Upload Evidence
                                </button>
                                {formData.image && (
                                    <div className="mt-2 text-xs text-gold truncate">{formData.image}</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block font-mono text-xs text-muted uppercase mb-2">Report Details</label>
                            <textarea
                                rows={6}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-gold outline-none resize-none"
                                placeholder="Full report content..."
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-gold text-ink font-mono font-bold py-3 px-8 uppercase tracking-widest hover:bg-gold-light transition-colors flex items-center gap-2"
                            >
                                <Save size={16} /> {editingId ? "Update Report" : "Publish Report"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-white/5 text-muted hover:text-white font-mono font-bold py-3 px-6 uppercase tracking-widest transition-colors flex items-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                {/* LIST */}
                <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-6">Archived Files</h3>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-card/50 border border-white/5 p-4 flex justify-between items-center group hover:border-gold/20 transition-colors">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[10px] font-mono text-gold border border-gold/20 px-2 py-0.5 uppercase">{post.category}</span>
                                    <h4 className="font-bold text-lg">{post.title}</h4>
                                </div>
                                <div className="text-xs text-muted font-mono">
                                    {new Date(post.created_at).toLocaleDateString()} by {post.author || 'Unknown'}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="p-2 text-accent hover:bg-accent/10 rounded transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 text-red hover:bg-red/10 rounded transition-colors"
                                    title="Archive"
                                >
                                    <Trash2 size={16} />
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
