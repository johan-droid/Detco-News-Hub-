const { createClient } = require('@supabase/supabase-js');

// Run with: node --env-file=.env.local scripts/seed-characters.js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Error: Missing Supabase URL or Service Key in environment.");
    console.error("Did you run with 'node --env-file=.env.local scripts/seed-characters.js'?");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const characters = [
    {
        name: "Conan Edogawa",
        real_name: "Shinichi Kudo",
        role: "The Great Detective",
        description: "The primary protagonist. Originally a high school detective named Shinichi Kudo, he was shrunk into a child after being forced to ingest the poison APTX 4869 by the Black Organization. He now lives with Ran and her father, Kogoro Mouri, solving cases behind the scenes while searching for a cure.",
        emoji: "🔍",
        color: "#c0392b",
        faction: "Detective Boys"
    },
    {
        name: "Ran Mouri",
        real_name: "Ran Mouri",
        role: "Karate Champion",
        description: "Shinichi's childhood friend and romantic interest. She is the captain of the Teitan High School Karate Club. She often takes care of Conan and her father. She suspects Conan's identity from time to time.",
        emoji: "🥋",
        color: "#e84393",
        faction: "Teitan High"
    },
    {
        name: "Kogoro Mouri",
        real_name: "Kogoro Mouri",
        role: "Sleeping Kogoro",
        description: "A private investigator and Ran's father. He was formerly a police officer. He is famous as 'Sleeping Kogoro' because he passes out (due to Conan's stun gun) and solves cases in his sleep (via Conan's voice changer).",
        emoji: "😴",
        color: "#2980b9",
        faction: "Mouri Detective Agency"
    },
    {
        name: "Ai Haibara",
        real_name: "Shiho Miyano",
        role: "Scientist & Former Black Org Member",
        description: "A former member of the Black Organization under the codename Sherry. She created APTX 4869. After her sister's death, she took the poison to commit suicide but shrank instead. She now lives with Professor Agasa and researches an antidote.",
        emoji: "🧪",
        color: "#8e44ad",
        faction: "Detective Boys"
    },
    {
        name: "Kaito Kid",
        real_name: "Kaito Kuroba",
        role: "Phantom Thief",
        description: "A magician and phantom thief who steals gems to find the Pandora Gem that grants immortality, to thwart a mysterious organization. He is a rival to Conan but often aids him.",
        emoji: "🎩",
        color: "#ecf0f1",
        faction: "Independent"
    },
    {
        name: "Heiji Hattori",
        real_name: "Heiji Hattori",
        role: "Detective of the West",
        description: "A high school detective from Osaka and Shinichi's rival/best friend. He is one of the few who knows Conan's true identity. He is a master of Kendo and speaks in Osaka dialect.",
        emoji: "🧢",
        color: "#27ae60",
        faction: "Osaka"
    },
    {
        name: "Gin",
        real_name: "Unknown",
        role: "Black Org Executive",
        description: "A high-ranking executive of the Black Organization. He is cold-blooded and ruthless. He was the one who gave Shinichi the APTX 4869 poison. Always seen with his partner Vodka.",
        emoji: "🚬",
        color: "#2c3e50",
        faction: "Black Organization"
    },
    {
        name: "Vermouth",
        real_name: "Sharon Vineyard",
        role: "Black Org Executive",
        description: "A high-ranking member of the Black Organization and a master of disguise. She has a mysterious connection to Shinichi and Ran, whom she calls 'Cool Guy' and 'Angel'. She seems to age very slowly.",
        emoji: "💋",
        color: "#f1c40f",
        faction: "Black Organization"
    },
    {
        name: "Professor Agasa",
        real_name: "Hiroshi Agasa",
        role: "Inventor & Mentor",
        description: "Shinichi's neighbor and inventor who creates gadgets for Conan. He is one of the first to learn Conan's true identity and helps him keep his secret. He also takes care of Ai Haibara.",
        emoji: "🔬",
        color: "#95a5a6",
        faction: "Ally"
    },
    {
        name: "Kazuha Toyama",
        real_name: "Kazuha Toyama",
        role: "Heiji's Childhood Friend",
        description: "Heiji Hattori's childhood friend and love interest from Osaka. She is skilled in Aikido and often accompanies Heiji on cases. She has a strong rivalry with Ran over their respective detective partners.",
        emoji: "💚",
        color: "#16a085",
        faction: "Osaka"
    },
    {
        name: "Shuichi Akai",
        real_name: "Shuichi Akai",
        role: "FBI Agent",
        description: "An FBI agent who infiltrated the Black Organization under the alias 'Dai Moroboshi'. He is considered the Organization's 'Silver Bullet'. An exceptional sniper and strategist.",
        emoji: "🎯",
        color: "#34495e",
        faction: "FBI"
    },
    {
        name: "Masumi Sera",
        real_name: "Masumi Sera",
        role: "High School Detective",
        description: "A high school detective and Jeet Kune Do practitioner. She transfers to Ran's school and shows great interest in Conan. She is Shuichi Akai's younger sister.",
        emoji: "🥊",
        color: "#e67e22",
        faction: "Teitan High"
    },
    {
        name: "Bourbon",
        real_name: "Rei Furuya / Tooru Amuro",
        role: "Triple Agent",
        description: "A member of the Black Organization who is actually an undercover agent from the Japanese Public Security Bureau. He works at Café Poirot below the Mouri Detective Agency as Tooru Amuro.",
        emoji: "☕",
        color: "#f39c12",
        faction: "Black Organization"
    },
    {
        name: "Kaitou Kid",
        real_name: "Kaito Kuroba",
        role: "Gentleman Thief",
        description: "The second generation Kaitou Kid, son of the original. A master magician who steals jewels to find Pandora and destroy it. He has a striking resemblance to Shinichi Kudo.",
        emoji: "🃏",
        color: "#ffffff",
        faction: "Independent"
    },
    {
        name: "Sonoko Suzuki",
        real_name: "Sonoko Suzuki",
        role: "Ran's Best Friend",
        description: "Ran's best friend and the daughter of the wealthy Suzuki family. She is boy-crazy and often gets involved in cases. She is dating Makoto Kyogoku, a karate champion.",
        emoji: "👑",
        color: "#9b59b6",
        faction: "Teitan High"
    },
    {
        name: "Makoto Kyogoku",
        real_name: "Makoto Kyogoku",
        role: "Karate Champion",
        description: "Known as 'The Prince of Kicks', he is a 400-time undefeated karate champion and Sonoko's boyfriend. He is incredibly strong and protective of Sonoko.",
        emoji: "🥋",
        color: "#c0392b",
        faction: "Ally"
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
            console.log(`Added: ${char.name}`);
        }
    }
    console.log("Seeding complete!");
}

seedCharacters();
