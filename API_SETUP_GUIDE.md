# API Setup Guide for Lyrik Music App

This guide will help you set up the new API services for your music app.

## Overview

The app now uses a **Multi-API approach** combining:
- **Spotify Web API** - Main music data, search, charts, recommendations
- **Genius API** - Song lyrics
- **Audio Playback** - 30-second preview clips from Spotify

## Step 1: Get Spotify API Credentials

### 1.1 Create a Spotify Developer Account
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one if needed)
3. Click **"Create an App"**

### 1.2 Create Your App
1. **App Name**: "Lyrik Music App" (or any name you prefer)
2. **App Description**: "A music discovery and streaming application"
3. **Website**: Leave blank or add your website
4. **Redirect URIs**: Leave blank (not needed for Client Credentials flow)
5. Accept the Terms of Service
6. Click **"Create"**

### 1.3 Get Your Credentials
1. Once created, you'll see your app dashboard
2. Click **"Settings"** button
3. Copy your **Client ID**
4. Click **"View client secret"** and copy your **Client Secret**
5. Keep these safe - you'll need them in Step 3

**Important**: Never commit these credentials to Git!

---

## Step 2: Get Genius API Token

### 2.1 Create a Genius Account
1. Go to [Genius API Clients](https://genius.com/api-clients)
2. Sign up or log in with your Genius account

### 2.2 Create an API Client
1. Click **"New API Client"**
2. **App Name**: "Lyrik Music App"
3. **App Website URL**: Can use `http://localhost:5173` for development
4. **Redirect URI**: Can use `http://localhost:5173/callback`
5. Click **"Save"**

### 2.3 Generate Access Token
1. Once created, you'll see your client details
2. Copy the **Client Access Token** (this is what you need)
3. Keep this safe - you'll need it in Step 3

---

## Step 3: Configure Environment Variables

### 3.1 Create .env File
1. In your project root, create a file named `.env` (if it doesn't exist)
2. Add the following content:

```env
# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# Genius API for Lyrics
VITE_GENIUS_ACCESS_TOKEN=your_genius_access_token_here

# Geo Location API (optional - for "Around You" feature)
VITE_GEO_API_KEY=
```

### 3.2 Replace Placeholders
Replace the placeholder values with your actual credentials:
- Replace `your_spotify_client_id_here` with your Spotify Client ID
- Replace `your_spotify_client_secret_here` with your Spotify Client Secret
- Replace `your_genius_access_token_here` with your Genius Access Token

### 3.3 Save the File
Save the `.env` file. Make sure it's in your `.gitignore` to prevent committing credentials.

---

## Step 4: Install Dependencies (if needed)

Your project should already have all necessary dependencies. If you encounter issues, run:

```bash
npm install
```

---

## Step 5: Start the Development Server

```bash
npm run dev
```

The app should now start and connect to the new APIs!

---

## Features & API Mapping

| Feature | API Used | Status |
|---------|----------|--------|
| **Discover by Genre** | Spotify Recommendations | ✅ Working |
| **Top Charts** | Spotify Top 50 Global Playlist | ✅ Working |
| **Around You** | Spotify Country-specific Playlists | ✅ Working |
| **Search Songs** | Spotify Search API | ✅ Working |
| **Song Details** | Spotify Track Details | ✅ Working |
| **Lyrics** | Genius API | ✅ Working (with link to Genius.com) |
| **Related Songs** | Spotify Recommendations | ✅ Working |
| **Artist Details** | Spotify Artist API | ✅ Working |
| **Audio Playback** | Spotify 30s Preview URLs | ✅ Working |

---

## Troubleshooting

### Issue: "401 Unauthorized" Error
**Solution**: Check that your Spotify credentials are correct in the `.env` file.

### Issue: No lyrics showing
**Solution**: 
- Verify your Genius API token is correct
- Note: Genius API doesn't provide lyrics directly due to licensing. The app will show a link to view lyrics on Genius.com

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` to ensure all dependencies are installed.

### Issue: Environment variables not loading
**Solution**: 
- Make sure your `.env` file is in the project root
- Restart the development server after changing `.env`
- Ensure variable names start with `VITE_` (required for Vite)

### Issue: Songs not playing
**Solution**: 
- Not all Spotify tracks have preview URLs
- This is a limitation of Spotify's free tier
- The app will show songs but some may not have playable previews

---

## API Rate Limits

### Spotify
- **Client Credentials Flow**: Generous rate limits
- Typically sufficient for development and moderate use
- No user authentication required

### Genius
- **Free Tier**: 1000 requests per day
- Should be sufficient for most use cases

---

## Optional: Geo Location API

The "Around You" feature can detect your location and show local charts. To enable this:

1. Sign up at [IPify](https://geo.ipify.org/)
2. Get your API key
3. Add it to `.env` as `VITE_GEO_API_KEY`
4. Uncomment the geolocation code in `src/pages/AroundYou.jsx`

Currently, the app defaults to US charts if geolocation is not configured.

---

## Next Steps

Once everything is working, you can:
1. **Deploy your app** to Netlify, Vercel, or another hosting service
2. **Add more features** like:
   - User playlists
   - Favorites/likes
   - Social sharing
   - More advanced recommendations
3. **Improve the UI** with additional animations and interactions

---

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all API credentials are correct
3. Ensure the development server is running
4. Check that all dependencies are installed

---

## Security Notes

⚠️ **Important Security Practices**:
- Never commit your `.env` file to Git
- Never share your API credentials publicly
- Use environment variables for all sensitive data
- For production, use proper secrets management

---

## API Documentation Links

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Genius API Docs](https://docs.genius.com/)
- [IPify Geo API Docs](https://geo.ipify.org/docs)

---

**Congratulations!** Your music app is now powered by Spotify and Genius APIs. Enjoy building! 🎵
