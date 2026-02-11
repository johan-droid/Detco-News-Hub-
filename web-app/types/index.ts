export type NewsItem = {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
    image?: string;
    author?: string;
    updated_at?: string;
};

export type CharacterItem = {
    id: string;
    name: string;
    real_name?: string;
    role?: string;
    description?: string;
    image?: string;
    emoji?: string;
    color?: string;
    faction?: string; // maps to badge
};
