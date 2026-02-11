
const { createClient } = require('@supabase/supabase-js');

// Run with: node --env-file=.env.local scripts/seed-characters.js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Error: Missing Supabase URL or Service Key in environment.");
    console.error("Did you run with 'node --env-file=.env.local scripts/seed-characters.js'?");
    console.error("Current env keys:", Object.keys(process.env));
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const characters = [
    {
        name: "Conan Edogawa",
        real_name: "Shinichi Kudo",
        role: "The Great Detective",
        description: "The primary protagonist. Originally a high school detective named Shinichi Kudo, he was shrunk into a child after being forced to ingest the poison APTX 4869 by the Black Organization. He now lives with Ran and her father, Kogoro Mouri, solving cases behind the scenes while searching for a cure.",
        emoji: "👓",
        color: "#c0392b", // Red (tie)
        faction: "Detective Boys",
        image: "https://upload.wikimedia.org/wikipedia/en/3/3d/Conan_Edogawa.jpg" // Placeholder or use legitimate URL
    },
    {
        name: "Ran Mouri",
        real_name: "Ran Mouri",
        role: "Karate Champion",
        description: "Shinichi's childhood friend and romantic interest. She is the captain of the Teitan High School Karate Club. She often takes care of Conan and her father. She suspects Conan's identity from time to time.",
        emoji: "🥋",
        color: "#e84393", // Pink
        faction: "Teitan High"
    },
    {
        name: "Kogoro Mouri",
        real_name: "Kogoro Mouri",
        role: "Sleeping Kogoro",
        description: "A private investigator and Ran's father. He was formerly a police officer. He is famous as 'Sleeping Kogoro' because he passes out (due to Conan's stun gun) and solves cases in his sleep (via Conan's voice changer).",
        emoji: "😴",
        color: "#2980b9", // Blue (Suit)
        faction: "Mouri Detective Agency"
    },
    {
        name: "Ai Haibara",
        real_name: "Shiho Miyano",
        role: "Scientist",
        description: "A former member of the Black Organization under the codename Sherry. She created APTX 4869. After her sister's death, she took the poison to commit suicide but shrank instead. She now lives with Professor Agasa and researches an antidote.",
        emoji: "🧪",
        color: "#8e44ad", // Purple
        faction: "Detective Boys"
    },
    {
        name: "Kaito Kid",
        real_name: "Kaito Kuroba",
        role: "Phantom Thief",
        description: "A magician and phantom thief who steals gems to find the Pandora Gem that grants immortality, to thwart a mysterious organization. He is a rival to Conan but often aids him.",
        emoji: "🎩",
        color: "#bdc3c7", // White/Silver
        faction: "Independent"
    },
    {
        name: "Heiji Hattori",
        real_name: "Heiji Hattori",
        role: "Detective of the West",
        description: "A high school detective from Osaka and Shinichi's rival/best friend. He is one of the few who knows Conan's true identity. He is a master of Kendo.",
        emoji: "🧢",
        color: "#27ae60", // Green
        faction: "Osaka"
    },
    {
        name: "Gin",
        real_name: "Unknown",
        role: "Executive",
        description: "A high-ranking executive of the Black Organization. He is cold-blooded and ruthless. He was the one who gave Shinichi the APTX 4869 poison.",
        emoji: "🚬",
        color: "#2c3e50", // Dark Grey/Black
        faction: "Black Organization"
    },
    {
        name: "Vermouth",
        real_name: "Sharon Vineyard",
        role: "Executive",
        description: "A high-ranking member of the Black Organization and a master of disguise. She has a mysterious connection to Shinichi and Ran, whom she calls 'Cool Guy' and 'Angel'.",
        emoji: "💋",
        color: "#f1c40f", // Gold
        faction: "Black Organization"
    }
];

async function seedCharacters() {
    console.log("Seeding characters...");

    // Clear existing data to avoid conflicts and ensure clean slate
    const { error: deleteError } = await supabase.from('characters').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) console.log("Note deleting existing: " + deleteError.message);

    for (const char of characters) {
        const { data, error } = await supabase
            .from('characters')
            .insert(char)
            .select();

        if (error) {
            console.error(`Error adding ${char.name}:`, error.message);
        } else {
            console.log(`Added/Updated: ${char.name}`);
        }
    }
    console.log("Seeding complete!");
}

seedCharacters();
