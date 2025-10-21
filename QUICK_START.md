# Quick Start Guide

## ⚡ Get Your App Running in 5 Minutes

### Step 1: Get Spotify Credentials (2 minutes)
1. Go to https://developer.spotify.com/dashboard
2. Log in and click "Create an App"
3. Name it "Lyrik Music App"
4. Copy your **Client ID** and **Client Secret**

### Step 2: Get Genius Token (1 minute)
1. Go to https://genius.com/api-clients
2. Click "New API Client"
3. Fill in any details (use `http://localhost:5173` for URL)
4. Copy your **Client Access Token**

### Step 3: Create .env File (1 minute)
Create a file named `.env` in your project root with:

```env
VITE_SPOTIFY_CLIENT_ID=paste_your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=paste_your_spotify_client_secret_here
VITE_GENIUS_ACCESS_TOKEN=paste_your_genius_token_here
```

### Step 4: Install & Run (1 minute)
```bash
npm install
npm run dev
```

### Step 5: Open Your App
Visit: http://localhost:5173

## ✅ That's It!

Your music app should now be working with:
- ✅ Top Charts
- ✅ Genre Discovery
- ✅ Search
- ✅ Song Details
- ✅ Lyrics
- ✅ Artist Pages
- ✅ Audio Playback

## 🆘 Having Issues?

Check [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) for detailed troubleshooting.

## 🎵 Enjoy Your Music App!
