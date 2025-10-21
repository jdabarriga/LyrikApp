# Lyrik Music App - A Modern Music Discovery Platform

A beautiful music discovery and streaming application built with React 18, powered by Spotify and Genius APIs.

## 🎵 Features

- **Discover Music** - Browse songs by genre (Pop, Hip-Hop, Rock, Electronic, and more)
- **Top Charts** - View global top 50 trending songs
- **Around You** - Explore popular music by country
- **Search** - Find any song, artist, or album
- **Song Details** - View detailed information and lyrics
- **Artist Profiles** - Explore artist pages with top tracks
- **Related Songs** - Discover similar music based on your selections
- **Audio Playback** - Listen to 30-second preview clips
- **Modern UI** - Beautiful, responsive design with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router
- **Styling**: Tailwind CSS
- **APIs**: 
  - Spotify Web API (music data, search, recommendations)
  - Genius API (song lyrics)
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query

## 📋 Prerequisites

Before you begin, you'll need:
- Node.js (v14 or higher)
- npm or yarn
- Spotify Developer Account
- Genius API Account

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd LyrikApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get API Credentials

Follow the detailed instructions in [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) to:
- Create a Spotify Developer account and get your Client ID & Secret
- Create a Genius API account and get your Access Token

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
VITE_GENIUS_ACCESS_TOKEN=your_genius_access_token
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 📖 Documentation

- [API Setup Guide](./API_SETUP_GUIDE.md) - Detailed instructions for setting up API credentials
- [Spotify API Docs](https://developer.spotify.com/documentation/web-api)
- [Genius API Docs](https://docs.genius.com/)

## 🎨 Project Structure

```
LyrikApp/
├── src/
│   ├── assets/          # Images, icons, constants
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── redux/          # Redux store and API services
│   │   ├── features/   # Redux slices
│   │   └── services/   # API service definitions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env                # Environment variables (create this)
├── .env.example        # Environment variables template
└── package.json        # Dependencies
```

## 🌟 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your API credentials private
- Use environment variables for all sensitive data

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- User authentication
- Personal playlists
- Favorites/likes functionality
- Social sharing
- Full-length audio playback (requires premium API access)
- Advanced recommendation algorithms

---

Built using React, Redux, and modern web technologies

