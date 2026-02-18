const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local because dotenv doesn't do it automatically for .local files usually, or standard behavior.
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '.env.local')));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key (first 10 chars):', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Connection FAILED:', error.message);
            if (error.code) console.error('Error Code:', error.code);
            if (error.details) console.error('Error Details:', error.details);
        } else {
            console.log('Connection SUCCESSFUL! Supabase is reachable.');
        }
    } catch (err) {
        console.error('UNEXPECTED ERROR:', err.message);
    }
}

testConnection();
