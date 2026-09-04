const fs = require('fs');
const path = require('path');

// 1. Load the .env file
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error("❌ No .env file found!");
  process.exit(1);
}

const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const clientId = envVars['EXPO_PUBLIC_SPOTIFY_CLIENT_ID'];
const clientSecret = envVars['SPOTIFY_CLIENT_SECRET'];

if (!clientId || !clientSecret || clientId.includes('your_spotify_')) {
  console.error("❌ Please ensure both EXPO_PUBLIC_SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are set in your .env file.");
  process.exit(1);
}

// 2. Get the search query from the terminal command
const searchQuery = process.argv.slice(2).join(' ');

if (!searchQuery) {
  console.log("⚠️ Please provide a song to search for!");
  console.log("Usage: node search-spotify.js \"Name of song\"");
  process.exit(1);
}

async function searchSpotify() {
  console.log(`\n🔍 Searching Spotify for: "${searchQuery}"...\n`);
  
  try {
    // 3. Authenticate to get a temporary Access Token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) throw new Error("Failed to authenticate with Spotify");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 4. Search the Spotify API
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=2`;
    const searchResponse = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!searchResponse.ok) throw new Error("Failed to fetch search results");
    const data = await searchResponse.json();

    // 5. Print the raw JSON response
    console.log("✅ RESULT FROM SPOTIFY API:");
    console.log("=========================================");
    console.log(JSON.stringify(data, null, 2));
    console.log("=========================================\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

searchSpotify();
