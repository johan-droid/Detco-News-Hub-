const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Simple env parser since we might not have dotenv installed
function loadEnv() {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('.env.local not found!');
        process.exit(1);
    }
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminSecret = process.env.ADMIN_SECRET_KEY;

if (!supabaseUrl || !serviceRoleKey || !adminSecret) {
    console.error('Missing required env vars. Check .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdmin() {
    const email = 'admin@detco-internal.com';
    const password = adminSecret;

    console.log(`Attempting to create/update admin user: ${email}`);

    // Try to get user by email first (to see if exists)
    // Note: admin.listUsers or similar could be used, but create is often idempotent-ish or throws specific error
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        console.log('User already exists, updating password...');
        const { data, error } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: password }
        );
        if (error) console.error('Error updating password:', error);
        else console.log('Password updated successfully.');
    } else {
        console.log('User does not exist, creating...');
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });
        if (error) console.error('Error creating user:', error);
        else console.log('User created successfully:', data.user.id);
    }
}

createAdmin();
