# MindfulConnect - AI Mental Health Platform for India 🇮🇳🧠✨

A revolutionary mental health and social connection platform specifically designed for India, featuring comprehensive regional language support, 3D AI avatars, and advanced multimedia generation. Built for the Google Gen AI Exchange Hackathon with cutting-edge AI technology.

## 🎯 **Live Demo Available!**

**Try it now**: [http://localhost:3001](http://localhost:3001) (when running locally)

**No login required** - Click any feature card to instantly experience the platform!

## 🌟 **Revolutionary Features**

### 🤖 **Advanced AI Companion with 3D Video Calls**
- **18+ Indian Regional Languages**: Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu, Sanskrit, and more
- **3D AI Avatar Video Calls**: Revolutionary face-to-face conversations with animated AI companion
- **Real-time Emotion Detection**: Camera-based facial emotion recognition during video calls
- **Personality Customization**: Empathetic, Energetic, Calm, or Wise AI personalities
- **Voice Integration**: Natural speech recognition and synthesis in regional languages
- **Cultural Sensitivity**: AI responses adapted for Indian cultural context

### 🎨 **Advanced Multimedia Generation**
- **AI Image Generation**: Create custom images based on mood and preferences
- **AI Video Generation**: Generate personalized video content for therapy
- **AI Music Composition**: Create healing music tailored to emotional state
- **Spotify Integration**: Access to Indian regional music playlists (Bollywood, Classical, Folk)
- **Mood-Based Content**: All content generated based on current emotional state
- **Regional Preferences**: Content adapted for Indian cultural tastes

### 🎥 **3D AI Avatar Video Calls**
- **Immersive 3D Experience**: Lifelike AI avatar with realistic animations
- **Real-time Facial Expressions**: AI avatar responds with appropriate emotions
- **Multilingual Video Support**: Video calls in all 18+ Indian languages
- **Emotion-Responsive AI**: Avatar changes expressions based on conversation
- **Professional Call Interface**: Full-screen mode with call controls
- **Privacy-First**: No video recording, only real-time processing
- **Call Analytics**: Post-call emotional insights and conversation summary

### 🌍 Gamified Virtual World
- **3D Social Environment**: Immersive virtual space with floating avatars
- **Leveling System**: Gain XP and level up through positive interactions
- **Achievement Badges**: Unlock badges for helping others and personal growth
- **Helper Network**: Verified helpers with special privileges and badges
- **User Statistics**: Track support given/received, connections, and progress
- **Mood-based Matching**: Connect with others based on emotional compatibility

### 🎨 Advanced Content Generation
- **AI Art Descriptions**: Detailed artwork concepts tailored to emotional states
- **Personalized Playlists**: Curated music recommendations with specific songs
- **Healing Stories**: Inspirational narratives for emotional support
- **Visual Content**: Mood-responsive images, mandalas, and breathing exercises
- **Multilingual Content**: Generated content in your preferred language

### 🏆 Gamification & Progress
- **Experience Points**: Earn XP for positive interactions and self-care
- **Level Progression**: Visual progress bars and level-up celebrations
- **Achievement System**: Comprehensive badge system for milestones
- **Community Recognition**: Special recognition for top helpers
- **Daily Challenges**: Mood-based activities and connection goals

### 🚨 **Indian Emergency Support System**
- **Indian Crisis Helplines**: KIRAN Mental Health (1800-599-0019), Vandrevala Foundation (9999666555)
- **Regional Emergency Numbers**: State-specific crisis support contacts
- **24/7 Support**: Round-the-clock access to emergency resources
- **Multilingual Crisis Support**: Emergency help in regional languages
- **Professional Network**: Connect with verified Indian counselors and therapists

### Google Products Maximization
- **Google Gemini AI**: Advanced conversational AI with multilingual support
- **Firebase Suite**: Authentication, Firestore, Storage, Hosting, Functions
- **Google Cloud Vision**: Facial emotion detection and analysis
- **Google Cloud Speech**: Voice processing and synthesis
- **Google Cloud Natural Language**: Advanced sentiment analysis
- **Google Analytics**: User behavior insights and performance monitoring

## 🚀 **Quick Start (Demo Mode)**

### **Instant Demo - No Setup Required!**

The platform runs in **demo mode** by default - no API keys or authentication needed!

### **Prerequisites**
- Node.js 18+
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mindful-connect.git
cd mindful-connect
```

2. **Install dependencies**
```bash
npm install
```

3. **Install additional 3D dependencies**
```bash
npm install three @react-three/fiber @react-three/drei
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3001](http://localhost:3001)

### **Optional: Full API Integration**

For full functionality, create a `.env.local` file:
```env
# Firebase Configuration (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI (Optional)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## � **How to Use the Demo**

### **1. Landing Page Experience**
- **Professional Template**: Beautiful EmpathyAI-style landing page
- **Feature Overview**: Clear presentation of all capabilities
- **Demo Mode Indicator**: Shows this is a demo version
- **One-Click Access**: Click any feature card to try it instantly

### **2. AI Companion Features**
1. **Click "AI Companion" card** on landing page
2. **Start chatting** in any of 18+ Indian languages
3. **Try video calls** with 3D AI avatar (green camera icon)
4. **Generate content** using the multimedia tools
5. **Detect emotions** using camera (camera icon in header)

### **3. Virtual Community**
1. **Click "Virtual Community" card**
2. **Explore 3D virtual world** with floating avatars
3. **Customize your avatar** from the gallery
4. **Connect with others** in the social space

### **4. Multimedia Generation**
1. **Click "Mood-Based Creation" card**
2. **Generate images, videos, music** based on your mood
3. **Access Spotify integration** for Indian regional music
4. **Create personalized content** for therapy

### **5. Emergency Support**
1. **Click "Emergency Support" card**
2. **Access Indian crisis helplines** and emergency numbers
3. **Get immediate help** in your preferred language

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion for smooth transitions
- **AI Integration**: Google Gemini Pro with demo mode fallback
- **Authentication**: Firebase Auth (optional in demo mode)
- **Database**: Firebase Firestore (optional in demo mode)
- **PWA**: Progressive Web App capabilities
- **Mobile**: Fully responsive design for all devices

### **Project Structure**
```
mindful-connect/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── avatar/            # Avatar customization system
│   │   ├── chat/              # AI chat interface
│   │   ├── demo/              # Demo mode components
│   │   ├── emergency/         # Emergency support features
│   │   ├── emotion/           # Emotion detection system
│   │   ├── landing/           # Landing page template
│   │   ├── multimedia/        # Content generation tools
│   │   ├── video/             # 3D video call system
│   │   └── virtual/           # Virtual world components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utility libraries
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── gemini.ts          # Gemini AI integration
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
```

## ✅ **Complete Feature Set**

### **🇮🇳 India-Specific Features**
✅ **18+ Regional Languages** - Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu, Sanskrit, etc.
✅ **Indian Emergency Support** - KIRAN Mental Health, Vandrevala Foundation, state-specific helplines
✅ **Cultural Adaptation** - AI responses tailored for Indian cultural context
✅ **Regional Music Integration** - Bollywood, Classical, Folk music through Spotify
✅ **Native Script Support** - Proper display of Devanagari, Bengali, Tamil, Telugu scripts

### **🤖 Advanced AI Features**
✅ **3D AI Avatar Video Calls** - Revolutionary face-to-face conversations
✅ **Real-time Emotion Detection** - Camera-based facial emotion recognition
✅ **Multilingual AI Responses** - Natural conversations in regional languages
✅ **Personality Customization** - Empathetic, Energetic, Calm, Wise personalities
✅ **Voice Integration** - Speech recognition and synthesis

### **🎨 Multimedia Generation**
✅ **AI Image Generation** - Custom images based on mood
✅ **AI Video Generation** - Personalized therapeutic videos
✅ **AI Music Composition** - Healing music creation
✅ **Spotify Integration** - Indian regional music playlists
✅ **Mood-Based Content** - All content adapted to emotional state

### **🌍 Social & Virtual Features**
✅ **3D Virtual World** - Immersive social environment
✅ **Avatar Customization** - Comprehensive avatar creation system
✅ **Gamification** - XP, levels, badges, achievements
✅ **Community Features** - Social connections and support network

### **🚨 Emergency & Support**
✅ **Crisis Detection** - AI monitors for signs of distress
✅ **Emergency Contacts** - Indian crisis helplines and support
✅ **24/7 Availability** - Round-the-clock support access
✅ **Professional Network** - Connect with verified counselors

### **📱 Technical Excellence**
✅ **Demo Mode** - No login required, instant access
✅ **Progressive Web App** - Mobile app-like experience
✅ **Responsive Design** - Works on all devices
✅ **Privacy-First** - No data storage, real-time processing only
✅ **Professional UI** - EmpathyAI-style template design

## 🛡️ Privacy & Security

- Anonymous guest access available
- No image capture, only emotion detection
- Secure Firebase authentication
- GDPR compliant data handling
- Optional KYC for verified interactions

## 📱 Mobile Experience

MindfulConnect is designed as a Progressive Web App (PWA) with:
- Offline capability
- App-like experience on mobile devices
- Push notifications for support
- Touch-optimized interface

## 🤝 Contributing

This project was built for the Google Gen AI Exchange Hackathon. Contributions and feedback are welcome!

## 📄 License

MIT License - see LICENSE file for details

## 🚀 **Deployment Options**

### **GitHub Pages**
```bash
npm run build
npm run export
# Deploy the 'out' folder to GitHub Pages
```

### **Vercel (Recommended)**
```bash
# Connect your GitHub repo to Vercel
# Automatic deployment on every push
```

### **Netlify**
```bash
# Connect your GitHub repo to Netlify
# Build command: npm run build
# Publish directory: .next
```

## 🆘 **Indian Emergency Support**

### **Mental Health Crisis Helplines**
- **KIRAN Mental Health**: 1800-599-0019 (24/7)
- **Vandrevala Foundation**: 9999666555 (24/7)
- **iCall**: 9152987821 (Mon-Sat, 8 AM-10 PM)
- **Sneha India**: 044-24640050 (24/7)
- **Aasra**: 022-27546669 (24/7)

### **Emergency Services**
- **Police**: 100
- **Fire**: 101
- **Ambulance**: 108
- **Women Helpline**: 1091
- **Child Helpline**: 1098

## 🤝 **Contributing**

This project was built for the Google Gen AI Exchange Hackathon. We welcome contributions!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 **License**

MIT License - see LICENSE file for details

## 🏆 **Hackathon Submission**

**Google Gen AI Exchange Hackathon 2024**
- **Category**: Mental Health & Social Impact
- **Focus**: AI-powered emotional support for India
- **Innovation**: First multilingual 3D AI video therapy platform
- **Impact**: Addressing mental health crisis in India with technology

---

**Built with ❤️ for India's mental health and well-being**

*Empowering every Indian with AI-powered emotional support in their native language* 🇮🇳✨
