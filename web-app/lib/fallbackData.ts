// Fallback data for when Supabase is unavailable
import type { NewsItem, CharacterItem } from "@/types";

export const fallbackNews: NewsItem[] = [
  {
    id: "fallback-1",
    title: "Detective Conan Manga Chapter 1100 Released",
    content: "The latest chapter brings shocking revelations as Conan faces his most challenging case yet. The plot thickens with unexpected twists that will leave fans on the edge of their seats.",
    category: "MANGA",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    author: "Case File Analyst",
    image: "/api/placeholder/400/250",
  },
  {
    id: "fallback-2", 
    title: "New Anime Season Announcement",
    content: "Exciting news for Detective Conan fans as a new anime season has been officially announced. The upcoming season promises to adapt some of the most beloved story arcs from the manga.",
    category: "ANIME",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    author: "Anime Tracker",
    image: "/api/placeholder/400/250",
  },
  {
    id: "fallback-3",
    title: "Fan Theory: The Truth About the Black Organization",
    content: "A comprehensive analysis of the Black Organization's structure and motivations. This theory connects multiple story arcs and provides new insights into the ongoing mystery.",
    category: "THEORY",
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    author: "Theory Analyst",
    image: "/api/placeholder/400/250",
  },
  {
    id: "fallback-4",
    title: "Detective Conan Movie 27 Box Office Success",
    content: "The latest Detective Conan movie breaks box office records with its thrilling storyline and stunning animation. Fans praise the film's perfect balance of mystery and action.",
    category: "EVENTS",
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    author: "Event Reporter",
    image: "/api/placeholder/400/250",
  },
];

export const fallbackCharacters: CharacterItem[] = [
  {
    id: "fallback-1",
    name: "Shinichi Kudo",
    real_name: "Shinichi Kudo",
    role: "High School Detective",
    description: "A brilliant high school detective who was transformed into a child after being forced to take a mysterious poison. He continues to solve cases while searching for the organization that changed him.",
    emoji: "🕵️",
    color: "#4A90D9",
    faction: "Detective",
  },
  {
    id: "fallback-2",
    name: "Conan Edogawa",
    real_name: "Shinichi Kudo",
    role: "Elementary School Detective",
    description: "Shinichi's child form after being poisoned. Uses advanced gadgets and his detective skills to solve cases while maintaining his secret identity.",
    emoji: "👦",
    color: "#c9a84c",
    faction: "Detective",
  },
  {
    id: "fallback-3",
    name: "Ran Mouri",
    real_name: "Ran Mouri",
    role: "Karate Champion",
    description: "Shinichi's childhood friend and love interest. A skilled martial artist who often finds herself involved in the cases Conan investigates.",
    emoji: "🥋",
    color: "#e74c3c",
    faction: "Ally",
  },
  {
    id: "fallback-4",
    name: "Kogoro Mouri",
    real_name: "Kogoro Mouri",
    role: "Private Detective",
    description: "Ran's father and a private detective. Often takes credit for Conan's solutions, earning him the nickname 'Sleeping Kogoro'.",
    emoji: "🔍",
    color: "#27ae60",
    faction: "Ally",
  },
  {
    id: "fallback-5",
    name: "Ai Haibara",
    real_name: "Shiho Miyano",
    role: "Former Black Organization Member",
    description: "A former member of the Black Organization who also took the same poison as Shinichi. Now works with Conan to develop an antidote.",
    emoji: "🔬",
    color: "#9B59B6",
    faction: "Ally",
  },
  {
    id: "fallback-6",
    name: "Gin",
    real_name: "Unknown",
    role: "Black Organization Executive",
    description: "A high-ranking member of the Black Organization and one of the main antagonists. Cold-blooded and ruthless in pursuing the organization's goals.",
    emoji: "🃏",
    color: "#c0392b",
    faction: "Black Organization",
  },
  {
    id: "fallback-7",
    name: "Vermouth",
    real_name: "Sharon Vineyard",
    role: "Black Organization Member",
    description: "A mysterious and powerful member of the Black Organization with connections to many characters. Her true motives remain unclear.",
    emoji: "🎭",
    color: "#34495e",
    faction: "Black Organization",
  },
  {
    id: "fallback-8",
    name: "Heiji Hattori",
    real_name: "Heiji Hattori",
    role: "High School Detective",
    description: "Shinichi's rival and friend from Osaka. A brilliant detective who often works with Conan on complex cases.",
    emoji: "⚔️",
    color: "#f39c12",
    faction: "Detective",
  },
];

export function useFallbackData() {
  return {
    news: fallbackNews,
    characters: fallbackCharacters,
  };
}
