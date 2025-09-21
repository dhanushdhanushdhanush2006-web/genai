# MindfulConnect - Complete Technical Documentation

## 📋 **Table of Contents**
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Component Architecture](#component-architecture)
4. [API Integration](#api-integration)
5. [Database Schema](#database-schema)
6. [Security Implementation](#security-implementation)
7. [Performance Optimization](#performance-optimization)
8. [Deployment Architecture](#deployment-architecture)
9. [Development Workflow](#development-workflow)
10. [Testing Strategy](#testing-strategy)

---

## 🏗️ **System Architecture**

### **High-Level Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Next.js)     │◄──►│   (Firebase)    │◄──►│   (Google AI)   │
│                 │    │                 │    │                 │
│ • React 18      │    │ • Firestore     │    │ • Gemini Pro    │
│ • TypeScript    │    │ • Auth          │    │ • Cloud Vision  │
│ • Tailwind CSS  │    │ • Storage       │    │ • Cloud Speech  │
│ • Three.js      │    │ • Functions     │    │ • Cloud NLP     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   CDN/Hosting   │
                    │                 │
                    │ • Vercel        │
                    │ • GitHub Pages  │
                    │ • Firebase Host │
                    └─────────────────┘
```

### **Data Flow Architecture**
```
User Input → Component → Context → API Layer → External Services
    ↓           ↓          ↓         ↓            ↓
UI Events → State Mgmt → Business → Firebase → Google AI APIs
    ↓           ↓          Logic      ↓            ↓
Validation → Local State → Error → Real-time → AI Processing
    ↓           ↓          Handling   Updates      ↓
Response ← UI Update ← State Update ← Data ← AI Response
```

### **Microservices Architecture**
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│ Landing Page │ Chat Interface │ Virtual World │ Emergency   │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer                            │
├─────────────────────────────────────────────────────────────┤
│ Auth Service │ AI Service │ Media Service │ Emergency Svc   │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│ User Data │ Chat History │ Media Assets │ Emergency Contacts │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ **Technology Stack**

### **Frontend Technologies**
```typescript
// Core Framework
Next.js 15.5.3          // React framework with App Router
React 18.1.0            // UI library with concurrent features
TypeScript 5.x          // Type-safe JavaScript

// Styling & UI
Tailwind CSS 4.x        // Utility-first CSS framework
Framer Motion 12.x      // Animation library
Lucide React 0.544.0    // Icon library

// 3D Graphics & Visualization
Three.js 0.180.0        // 3D graphics library
@react-three/fiber 9.3.0   // React renderer for Three.js
@react-three/drei 10.7.6    // Useful helpers for R3F

// State Management
React Context API       // Built-in state management
React Hooks            // State and lifecycle management

// PWA & Performance
next-pwa 5.6.0         // Progressive Web App features
```

### **Backend & Services**
```typescript
// Authentication & Database
Firebase 12.3.0         // Backend-as-a-Service
- Firebase Auth         // User authentication
- Firestore            // NoSQL database
- Firebase Storage     // File storage
- Firebase Functions   // Serverless functions
- Firebase Hosting     // Static hosting

// AI & ML Services
@google/generative-ai 0.24.1  // Gemini AI integration
Google Cloud Vision API        // Image analysis
Google Cloud Speech API        // Speech recognition
Google Cloud Natural Language  // Text analysis
```

### **Development Tools**
```json
{
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.180.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 🧩 **Component Architecture**

### **Component Hierarchy**
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── favicon.ico              # App icon
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── LoginScreen.tsx      # Login interface
│   │   ├── AuthModal.tsx        # Authentication modal
│   │   └── ProtectedRoute.tsx   # Route protection
│   ├── avatar/                  # Avatar system
│   │   ├── CustomizableAvatar.tsx    # Avatar customization
│   │   ├── AvatarGallery.tsx         # Avatar selection
│   │   └── AvatarCreator.tsx         # Avatar creation tool
│   ├── chat/                    # Chat interface
│   │   ├── ChatInterface.tsx    # Main chat component
│   │   ├── MessageBubble.tsx    # Individual messages
│   │   ├── InputArea.tsx        # Message input
│   │   └── TypingIndicator.tsx  # Typing animation
│   ├── demo/                    # Demo mode components
│   │   └── DemoChatInterface.tsx     # Demo chat
│   ├── emergency/               # Emergency support
│   │   ├── EmergencyPanel.tsx   # Emergency interface
│   │   ├── CrisisDetection.tsx  # Crisis monitoring
│   │   └── HelplineList.tsx     # Emergency contacts
│   ├── emotion/                 # Emotion detection
│   │   ├── CameraEmotionDetector.tsx # Camera-based detection
│   │   ├── TextEmotionAnalyzer.tsx   # Text analysis
│   │   └── EmotionDisplay.tsx        # Emotion visualization
│   ├── landing/                 # Landing page
│   │   └── LandingPage.tsx      # Main landing component
│   ├── multimedia/              # Content generation
│   │   ├── MultimediaGenerator.tsx   # Main generator
│   │   ├── ImageGenerator.tsx        # AI image creation
│   │   ├── VideoGenerator.tsx        # AI video creation
│   │   ├── MusicGenerator.tsx        # AI music creation
│   │   └── SpotifyIntegration.tsx    # Spotify player
│   ├── video/                   # Video call system
│   │   ├── VideoCallWithAI.tsx  # Main video interface
│   │   ├── AI3DAvatar.tsx       # 3D AI avatar
│   │   ├── CallControls.tsx     # Call control buttons
│   │   └── CallAnalytics.tsx    # Call insights
│   ├── virtual/                 # Virtual world
│   │   ├── VirtualWorld.tsx     # 3D world container
│   │   ├── Scene3D.tsx          # Three.js scene
│   │   ├── UserAvatar.tsx       # User representation
│   │   └── SocialInteractions.tsx    # Social features
│   └── ui/                      # Reusable UI components
│       ├── Button.tsx           # Custom button
│       ├── Modal.tsx            # Modal component
│       ├── LoadingSpinner.tsx   # Loading indicator
│       └── Toast.tsx            # Notification system
├── contexts/                    # React contexts
│   ├── AuthContext.tsx          # Authentication state
│   ├── ChatContext.tsx          # Chat state management
│   ├── EmotionContext.tsx       # Emotion tracking
│   └── LanguageContext.tsx      # Language preferences
├── lib/                         # Utility libraries
│   ├── firebase.ts              # Firebase configuration
│   ├── gemini.ts                # Gemini AI integration
│   ├── emotions.ts              # Emotion processing
│   ├── languages.ts             # Language utilities
│   └── utils.ts                 # General utilities
├── types/                       # TypeScript definitions
│   ├── auth.ts                  # Authentication types
│   ├── chat.ts                  # Chat-related types
│   ├── emotion.ts               # Emotion types
│   └── user.ts                  # User data types
└── hooks/                       # Custom React hooks
    ├── useAuth.ts               # Authentication hook
    ├── useChat.ts               # Chat functionality
    ├── useEmotion.ts            # Emotion detection
    └── useLanguage.ts           # Language switching
```

### **Component Design Patterns**

#### **1. Container/Presentational Pattern**
```typescript
// Container Component (Logic)
const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (text: string) => {
    // Business logic here
  };
  
  return (
    <ChatPresentation
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
};

// Presentational Component (UI)
interface ChatPresentationProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatPresentation: React.FC<ChatPresentationProps> = ({
  messages,
  onSendMessage,
  isLoading
}) => {
  return (
    <div className="chat-container">
      {/* UI rendering */}
    </div>
  );
};
```

#### **2. Compound Component Pattern**
```typescript
// Main component with sub-components
const VideoCall = {
  Container: VideoCallContainer,
  Controls: CallControls,
  Avatar: AI3DAvatar,
  Analytics: CallAnalytics
};

// Usage
<VideoCall.Container>
  <VideoCall.Avatar personality="empathetic" />
  <VideoCall.Controls onEndCall={handleEndCall} />
  <VideoCall.Analytics callData={callData} />
</VideoCall.Container>
```

#### **3. Render Props Pattern**
```typescript
interface EmotionDetectorProps {
  children: (emotion: EmotionData) => React.ReactNode;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ children }) => {
  const [emotion, setEmotion] = useState<EmotionData>();
  
  // Emotion detection logic
  
  return <>{children(emotion)}</>;
};

// Usage
<EmotionDetector>
  {(emotion) => (
    <div>Current emotion: {emotion.type}</div>
  )}
</EmotionDetector>
```

---

## 🔌 **API Integration**

### **Google Gemini AI Integration**
```typescript
// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  
  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }
  
  async generateResponse(
    prompt: string, 
    emotion: string, 
    language: string
  ): Promise<string> {
    if (!this.model) {
      return this.getDemoResponse(emotion, language);
    }
    
    try {
      const enhancedPrompt = this.buildPrompt(prompt, emotion, language);
      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getDemoResponse(emotion, language);
    }
  }
  
  private buildPrompt(prompt: string, emotion: string, language: string): string {
    const languageInstructions = this.getLanguageInstructions(language);
    const emotionContext = this.getEmotionContext(emotion);
    
    return `
      You are a compassionate AI mental health companion for Indian users.
      
      Context:
      - User's current emotion: ${emotion}
      - Response language: ${language}
      - Cultural context: Indian
      
      Instructions:
      ${languageInstructions}
      ${emotionContext}
      
      User message: "${prompt}"
      
      Respond with empathy, cultural sensitivity, and appropriate emotional support.
      Keep responses concise but meaningful (2-3 sentences).
    `;
  }
  
  private getLanguageInstructions(language: string): string {
    const instructions = {
      'hi': 'Respond in Hindi (Devanagari script). Use respectful terms like "आप".',
      'bn': 'Respond in Bengali script. Use appropriate honorifics.',
      'te': 'Respond in Telugu script. Be culturally appropriate.',
      'ta': 'Respond in Tamil script. Use respectful language.',
      'en': 'Respond in English with Indian cultural context.'
    };
    
    return instructions[language as keyof typeof instructions] || instructions.en;
  }
  
  private getEmotionContext(emotion: string): string {
    const contexts = {
      'happy': 'User is feeling positive. Encourage and celebrate with them.',
      'sad': 'User needs comfort. Provide gentle support and validation.',
      'angry': 'User is frustrated. Help them process and calm down.',
      'anxious': 'User is worried. Offer reassurance and coping strategies.',
      'neutral': 'User seems calm. Engage in supportive conversation.'
    };
    
    return contexts[emotion as keyof typeof contexts] || contexts.neutral;
  }
  
  private getDemoResponse(emotion: string, language: string): string {
    // Demo responses for when API is not available
    const demoResponses = {
      'hi': {
        'happy': 'मुझे खुशी है कि आप अच्छा महसूस कर रहे हैं! आपकी खुशी मेरे लिए भी खुशी की बात है।',
        'sad': 'मैं समझ सकता हूं कि आप दुखी हैं। आप अकेले नहीं हैं, मैं यहां आपके साथ हूं।'
      },
      'en': {
        'happy': 'I\'m so glad to hear you\'re feeling good! Your happiness brings me joy too.',
        'sad': 'I understand you\'re feeling down. You\'re not alone - I\'m here with you.'
      }
    };
    
    return demoResponses[language as keyof typeof demoResponses]?.[emotion as keyof any] || 
           'I\'m here to support you. How can I help you today?';
  }
}

export const geminiService = new GeminiService();

// Supported languages with native names
export const supportedLanguages = {
  'en': 'English',
  'hi': 'हिन्दी (Hindi)',
  'bn': 'বাংলা (Bengali)',
  'te': 'తెలుగు (Telugu)',
  'ta': 'தமிழ் (Tamil)',
  'mr': 'मराठी (Marathi)',
  'gu': 'ગુજરાતી (Gujarati)',
  'kn': 'ಕನ್ನಡ (Kannada)',
  'ml': 'മലയാളം (Malayalam)',
  'pa': 'ਪੰਜਾਬੀ (Punjabi)',
  'or': 'ଓଡ଼ିଆ (Odia)',
  'as': 'অসমীয়া (Assamese)',
  'ur': 'اردو (Urdu)',
  'sa': 'संस्कृत (Sanskrit)',
  'ne': 'नेपाली (Nepali)',
  'si': 'සිංහල (Sinhala)',
  'my': 'မြန်မာ (Myanmar)',
  'th': 'ไทย (Thai)'
};

// Emotion analysis function
export async function analyzeTextEmotion(text: string): Promise<{
  emotion: string;
  confidence: number;
  suggestions: string[];
}> {
  // Simple emotion detection for demo
  const emotionKeywords = {
    happy: ['happy', 'joy', 'excited', 'good', 'great', 'wonderful', 'खुश', 'আনন্দ'],
    sad: ['sad', 'depressed', 'down', 'upset', 'cry', 'दुखी', 'কষ্ট'],
    angry: ['angry', 'mad', 'frustrated', 'annoyed', 'गुस्सा', 'রাগ'],
    anxious: ['anxious', 'worried', 'nervous', 'scared', 'चिंता', 'উদ্বেগ'],
    neutral: ['okay', 'fine', 'normal', 'ठीक', 'ভালো']
  };
  
  const lowerText = text.toLowerCase();
  let detectedEmotion = 'neutral';
  let maxMatches = 0;
  
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedEmotion = emotion;
    }
  }
  
  const confidence = Math.min(0.3 + (maxMatches * 0.2), 0.9);
  
  const suggestions = {
    happy: ['Keep up the positive energy!', 'Share your joy with others'],
    sad: ['Take deep breaths', 'Consider talking to someone you trust'],
    angry: ['Try counting to 10', 'Take a short walk to cool down'],
    anxious: ['Practice mindfulness', 'Focus on what you can control'],
    neutral: ['How can I help you today?', 'What\'s on your mind?']
  };
  
  return {
    emotion: detectedEmotion,
    confidence,
    suggestions: suggestions[detectedEmotion as keyof typeof suggestions] || []
  };
}
```

### **Firebase Integration**
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Development emulators
if (process.env.NODE_ENV === 'development') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  } catch (error) {
    console.log('Emulators already connected or not available');
  }
}

// Database service
export class DatabaseService {
  async saveUserMessage(userId: string, message: any) {
    if (!db) return null;
    
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        userId,
        ...message,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  }
  
  async getUserProfile(userId: string) {
    if (!db) return null;
    
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }
  
  async updateUserPreferences(userId: string, preferences: any) {
    if (!db) return false;
    
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        preferences,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return false;
    }
  }
}

export const dbService = new DatabaseService();
```

---

## 🗄️ **Database Schema**

### **Firestore Collections Structure**
```typescript
// Database Schema Definition
interface DatabaseSchema {
  users: {
    [userId: string]: UserProfile;
  };
  messages: {
    [messageId: string]: ChatMessage;
  };
  sessions: {
    [sessionId: string]: ChatSession;
  };
  emotions: {
    [emotionId: string]: EmotionRecord;
  };
  emergencyContacts: {
    [contactId: string]: EmergencyContact;
  };
}

// User Profile Schema
interface UserProfile {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  preferences: {
    language: string;
    aiPersonality: 'empathetic' | 'energetic' | 'calm' | 'wise';
    avatarStyle: 'friendly' | 'professional' | 'playful' | 'wise';
    voicePreference: 'male' | 'female' | 'neutral';
    culturalContext: string;
    emergencyContacts: string[];
  };
  stats: {
    totalSessions: number;
    totalMessages: number;
    averageSessionDuration: number;
    lastActiveDate: Date;
    joinDate: Date;
    level: number;
    xp: number;
    badges: string[];
  };
  mentalHealthData: {
    moodHistory: MoodEntry[];
    triggerWords: string[];
    copingStrategies: string[];
    emergencyPlan: EmergencyPlan;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Chat Message Schema
interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  language: string;
  emotion?: {
    detected: string;
    confidence: number;
    timestamp: Date;
  };
  metadata: {
    aiModel: string;
    responseTime: number;
    tokens: number;
    context: string[];
  };
  timestamp: Date;
  isEdited: boolean;
  editHistory?: {
    content: string;
    timestamp: Date;
  }[];
}

// Chat Session Schema
interface ChatSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  messageCount: number;
  primaryEmotion: string;
  emotionChanges: {
    from: string;
    to: string;
    timestamp: Date;
  }[];
  topics: string[];
  aiPersonality: string;
  language: string;
  quality: {
    userSatisfaction?: number;
    helpfulness?: number;
    empathy?: number;
  };
  flags: {
    crisisDetected: boolean;
    emergencyTriggered: boolean;
    escalationNeeded: boolean;
  };
}

// Emotion Record Schema
interface EmotionRecord {
  id: string;
  userId: string;
  sessionId: string;
  emotion: string;
  confidence: number;
  source: 'text' | 'voice' | 'facial' | 'behavioral';
  context: string;
  triggers?: string[];
  timestamp: Date;
  metadata: {
    rawData?: any;
    processingTime: number;
    model: string;
  };
}

// Emergency Contact Schema
interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'personal' | 'professional' | 'crisis_line' | 'emergency_service';
  region: string;
  language: string[];
  availability: {
    hours: string;
    days: string[];
    timezone: string;
  };
  specialization?: string[];
  isVerified: boolean;
  priority: number;
}

// Mood Entry Schema
interface MoodEntry {
  date: Date;
  mood: string;
  intensity: number; // 1-10 scale
  triggers?: string[];
  notes?: string;
  activities?: string[];
  location?: string;
  weather?: string;
}

// Emergency Plan Schema
interface EmergencyPlan {
  triggers: string[];
  warningSigns: string[];
  copingStrategies: string[];
  emergencyContacts: string[];
  safetyPlan: string[];
  professionalSupport: {
    therapist?: string;
    doctor?: string;
    medication?: string[];
  };
  lastUpdated: Date;
}
```

### **Database Indexes**
```typescript
// Firestore Indexes Configuration
const indexes = [
  {
    collection: 'messages',
    fields: [
      { field: 'userId', order: 'ASCENDING' },
      { field: 'timestamp', order: 'DESCENDING' }
    ]
  },
  {
    collection: 'sessions',
    fields: [
      { field: 'userId', order: 'ASCENDING' },
      { field: 'startTime', order: 'DESCENDING' }
    ]
  },
  {
    collection: 'emotions',
    fields: [
      { field: 'userId', order: 'ASCENDING' },
      { field: 'timestamp', order: 'DESCENDING' }
    ]
  },
  {
    collection: 'emergencyContacts',
    fields: [
      { field: 'region', order: 'ASCENDING' },
      { field: 'priority', order: 'ASCENDING' }
    ]
  }
];
```

---

## 🔒 **Security Implementation**

### **Authentication Security**
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if running in demo mode
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || 
                     !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    setIsDemo(demoMode);

    if (demoMode) {
      // Create demo user
      setUser({
        uid: 'demo-user',
        isAnonymous: true,
        displayName: 'Demo User'
      } as User);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignInAnonymously = async () => {
    if (isDemo) return;
    
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Anonymous sign-in error:', error);
      throw error;
    }
  };

  const handleSignInWithGoogle = async () => {
    if (isDemo) return;
    
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    if (isDemo) {
      setUser(null);
      return;
    }
    
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInAnonymously: handleSignInAnonymously,
    signInWithGoogle: handleSignInWithGoogle,
    logout: handleLogout,
    isDemo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### **Data Privacy & Security**
```typescript
// lib/security.ts
export class SecurityService {
  // Sanitize user input
  static sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }

  // Validate message content
  static validateMessage(message: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (!message || message.trim().length === 0) {
      errors.push('Message cannot be empty');
    }
    
    if (message.length > 1000) {
      errors.push('Message too long (max 1000 characters)');
    }
    
    // Check for potential security threats
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /data:text\/html/i,
      /vbscript:/i
    ];
    
    if (dangerousPatterns.some(pattern => pattern.test(message))) {
      errors.push('Message contains potentially dangerous content');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Rate limiting
  static rateLimiter = new Map<string, { count: number; resetTime: number }>();
  
  static checkRateLimit(userId: string, limit: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userLimit = this.rateLimiter.get(userId);
    
    if (!userLimit || now > userLimit.resetTime) {
      this.rateLimiter.set(userId, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userLimit.count >= limit) {
      return false;
    }
    
    userLimit.count++;
    return true;
  }

  // Content filtering for crisis detection
  static detectCrisisKeywords(text: string): {
    isCrisis: boolean;
    severity: 'low' | 'medium' | 'high';
    keywords: string[];
  } {
    const crisisKeywords = {
      high: [
        'suicide', 'kill myself', 'end my life', 'want to die',
        'आत्महत्या', 'मरना चाहता हूं', 'জীবন শেষ', 'చావాలని'
      ],
      medium: [
        'hopeless', 'worthless', 'can\'t go on', 'give up',
        'निराश', 'बेकार', 'হতাশ', 'నిరాశ'
      ],
      low: [
        'depressed', 'sad', 'lonely', 'anxious',
        'उदास', 'अकेला', 'দুঃখিত', 'ఒంటరి'
      ]
    };
    
    const lowerText = text.toLowerCase();
    let detectedKeywords: string[] = [];
    let severity: 'low' | 'medium' | 'high' = 'low';
    
    for (const [level, keywords] of Object.entries(crisisKeywords)) {
      const found = keywords.filter(keyword => lowerText.includes(keyword.toLowerCase()));
      if (found.length > 0) {
        detectedKeywords = [...detectedKeywords, ...found];
        severity = level as 'low' | 'medium' | 'high';
      }
    }
    
    return {
      isCrisis: detectedKeywords.length > 0,
      severity,
      keywords: detectedKeywords
    };
  }
}
```

---

## ⚡ **Performance Optimization**

### **Code Splitting & Lazy Loading**
```typescript
// Dynamic imports for better performance
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const VideoCallWithAI = dynamic(() => import('@/components/video/VideoCallWithAI'), {
  loading: () => <div className="animate-pulse">Loading video call...</div>,
  ssr: false
});

const VirtualWorld = dynamic(() => import('@/components/virtual/VirtualWorld'), {
  loading: () => <div className="animate-pulse">Loading virtual world...</div>,
  ssr: false
});

const MultimediaGenerator = dynamic(() => import('@/components/multimedia/MultimediaGenerator'), {
  loading: () => <div className="animate-pulse">Loading multimedia tools...</div>,
  ssr: false
});

// Component with Suspense boundary
const ChatInterface: React.FC = () => {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <div className="chat-container">
        {/* Chat content */}
      </div>
    </Suspense>
  );
};
```

### **Memoization & Optimization**
```typescript
import { memo, useMemo, useCallback, useState } from 'react';

// Memoized component
const MessageBubble = memo<MessageBubbleProps>(({ message, onEdit, onDelete }) => {
  const formattedTime = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(message.timestamp);
  }, [message.timestamp]);

  const handleEdit = useCallback(() => {
    onEdit(message.id);
  }, [message.id, onEdit]);

  return (
    <div className="message-bubble">
      <p>{message.content}</p>
      <span className="timestamp">{formattedTime}</span>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
});

// Custom hooks for performance
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useThrottle = (callback: Function, delay: number) => {
  const [lastCall, setLastCall] = useState(0);

  return useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      setLastCall(now);
      callback(...args);
    }
  }, [callback, delay, lastCall]);
};
```

### **Image & Asset Optimization**
```typescript
// next.config.js optimization
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    
    return config;
  },
  
  // Compression
  compress: true,
  
  // PWA optimization
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
          }
        }
      }
    ]
  }
};
```

---

## 🚀 **Deployment Architecture**

### **Multi-Platform Deployment Strategy**
```yaml
# .github/workflows/deploy.yml
name: Deploy MindfulConnect

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          npm install three @react-three/fiber @react-three/drei

      - name: Run tests
        run: npm run test

      - name: Run linting
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_DEMO_MODE: true
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}

      - name: Export static files
        run: npm run export

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: out/

  deploy-github-pages:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: out/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          cname: mindfulconnect.ai

  deploy-vercel:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### **Environment Configuration**
```typescript
// lib/config.ts
interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isDemo: boolean;
  apiEndpoints: {
    gemini: string;
    firebase: string;
    spotify: string;
  };
  features: {
    videoCall: boolean;
    emotionDetection: boolean;
    multiLanguage: boolean;
    emergencySupport: boolean;
  };
}

export const config: EnvironmentConfig = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDemo: process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ||
          !process.env.NEXT_PUBLIC_GEMINI_API_KEY,

  apiEndpoints: {
    gemini: process.env.NEXT_PUBLIC_GEMINI_API_KEY ?
            'https://generativelanguage.googleapis.com' : '',
    firebase: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?
              `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com` : '',
    spotify: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?
             'https://api.spotify.com/v1' : ''
  },

  features: {
    videoCall: true, // Always enabled in demo
    emotionDetection: true,
    multiLanguage: true,
    emergencySupport: true
  }
};

// Feature flags
export const useFeatureFlag = (feature: keyof typeof config.features): boolean => {
  return config.features[feature];
};
```

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build
ENV NEXT_PUBLIC_DEMO_MODE=true
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### **Kubernetes Deployment**
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mindfulconnect
  labels:
    app: mindfulconnect
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mindfulconnect
  template:
    metadata:
      labels:
        app: mindfulconnect
    spec:
      containers:
      - name: mindfulconnect
        image: mindfulconnect:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_DEMO_MODE
          value: "true"
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: mindfulconnect-service
spec:
  selector:
    app: mindfulconnect
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mindfulconnect-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - mindfulconnect.ai
    secretName: mindfulconnect-tls
  rules:
  - host: mindfulconnect.ai
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: mindfulconnect-service
            port:
              number: 80
```

---

## 🔄 **Development Workflow**

### **Git Workflow Strategy**
```bash
# Branch naming convention
feature/ai-companion-enhancement
bugfix/emotion-detection-accuracy
hotfix/security-vulnerability
release/v1.2.0

# Commit message convention
feat: add 3D avatar video call functionality
fix: resolve emotion detection accuracy issue
docs: update API documentation
style: improve responsive design for mobile
refactor: optimize chat message rendering
test: add unit tests for emotion analysis
chore: update dependencies

# Development workflow
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature
# Create pull request
# Code review
# Merge to main
```

### **Code Quality Standards**
```typescript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true
      }
    }
  ]
};

// prettier.config.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### **Pre-commit Hooks**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  },
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

---

## 🧪 **Testing Strategy**

### **Unit Testing**
```typescript
// __tests__/components/ChatInterface.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { AuthProvider } from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';

// Mock external dependencies
jest.mock('@/lib/gemini', () => ({
  generateAIResponse: jest.fn().mockResolvedValue('Mocked AI response'),
  analyzeTextEmotion: jest.fn().mockResolvedValue({
    emotion: 'happy',
    confidence: 0.8,
    suggestions: ['Keep up the positive energy!']
  })
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <ChatProvider>
        {component}
      </ChatProvider>
    </AuthProvider>
  );
};

describe('ChatInterface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders chat interface correctly', () => {
    renderWithProviders(<ChatInterface />);

    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('sends message when form is submitted', async () => {
    renderWithProviders(<ChatInterface />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello AI' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
    });
  });

  test('displays AI response after sending message', async () => {
    renderWithProviders(<ChatInterface />);

    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'How are you?' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Mocked AI response')).toBeInTheDocument();
    });
  });

  test('handles emotion detection correctly', async () => {
    renderWithProviders(<ChatInterface />);

    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'I am feeling great today!' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/happy/i)).toBeInTheDocument();
    });
  });
});

// __tests__/lib/gemini.test.ts
import { analyzeTextEmotion, generateAIResponse } from '@/lib/gemini';

describe('Gemini AI Service', () => {
  describe('analyzeTextEmotion', () => {
    test('detects happy emotion correctly', async () => {
      const result = await analyzeTextEmotion('I am so happy today!');

      expect(result.emotion).toBe('happy');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.suggestions).toContain('Keep up the positive energy!');
    });

    test('detects sad emotion correctly', async () => {
      const result = await analyzeTextEmotion('I feel very sad and lonely');

      expect(result.emotion).toBe('sad');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    test('handles multilingual input', async () => {
      const result = await analyzeTextEmotion('मैं बहुत खुश हूं');

      expect(result.emotion).toBe('happy');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('generateAIResponse', () => {
    test('generates appropriate response for happy emotion', async () => {
      const response = await generateAIResponse(
        'I got a promotion today!',
        'happy',
        'en'
      );

      expect(response).toContain('congratulations' || 'happy' || 'great');
    });

    test('generates supportive response for sad emotion', async () => {
      const response = await generateAIResponse(
        'I lost my job today',
        'sad',
        'en'
      );

      expect(response).toContain('sorry' || 'support' || 'here');
    });
  });
});
```

### **Integration Testing**
```typescript
// __tests__/integration/chat-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '@/app/page';

describe('Chat Flow Integration', () => {
  test('complete chat interaction flow', async () => {
    render(<App />);

    // Navigate to chat
    fireEvent.click(screen.getByText('AI Companion'));

    // Send message
    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'I need help with anxiety' } });
    fireEvent.submit(input.closest('form')!);

    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText(/anxiety/i)).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check emotion detection
    expect(screen.getByText(/anxious/i)).toBeInTheDocument();

    // Check suggestions appear
    expect(screen.getByText(/breathing/i || /calm/i)).toBeInTheDocument();
  });

  test('emergency detection and response', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('AI Companion'));

    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'I want to hurt myself' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/emergency/i || /help/i)).toBeInTheDocument();
    });

    // Check emergency panel appears
    expect(screen.getByText(/crisis/i || /support/i)).toBeInTheDocument();
  });
});
```

### **E2E Testing with Playwright**
```typescript
// e2e/chat.spec.ts
import { test, expect } from '@playwright/test';

test.describe('MindfulConnect E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load landing page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('MindfulConnect');
    await expect(page.locator('[data-testid="demo-banner"]')).toBeVisible();
  });

  test('should navigate to AI companion', async ({ page }) => {
    await page.click('[data-testid="ai-companion-card"]');
    await expect(page.locator('[data-testid="chat-interface"]')).toBeVisible();
  });

  test('should send and receive messages', async ({ page }) => {
    await page.click('[data-testid="ai-companion-card"]');

    const input = page.locator('[data-testid="message-input"]');
    await input.fill('Hello, how are you?');
    await page.click('[data-testid="send-button"]');

    await expect(page.locator('[data-testid="user-message"]')).toContainText('Hello, how are you?');
    await expect(page.locator('[data-testid="ai-message"]')).toBeVisible({ timeout: 10000 });
  });

  test('should detect emotions correctly', async ({ page }) => {
    await page.click('[data-testid="ai-companion-card"]');

    const input = page.locator('[data-testid="message-input"]');
    await input.fill('I am feeling very sad today');
    await page.click('[data-testid="send-button"]');

    await expect(page.locator('[data-testid="emotion-indicator"]')).toContainText('sad');
  });

  test('should open video call interface', async ({ page }) => {
    await page.click('[data-testid="ai-companion-card"]');
    await page.click('[data-testid="video-call-button"]');

    await expect(page.locator('[data-testid="video-call-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-avatar"]')).toBeVisible();
  });

  test('should handle emergency situations', async ({ page }) => {
    await page.click('[data-testid="ai-companion-card"]');

    const input = page.locator('[data-testid="message-input"]');
    await input.fill('I am having thoughts of suicide');
    await page.click('[data-testid="send-button"]');

    await expect(page.locator('[data-testid="emergency-alert"]')).toBeVisible();
    await expect(page.locator('[data-testid="crisis-helplines"]')).toBeVisible();
  });

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    await page.click('[data-testid="ai-companion-card"]');

    const input = page.locator('[data-testid="message-input"]');
    await expect(input).toBeVisible();
    await input.fill('Mobile test message');
    await page.click('[data-testid="send-button"]');

    await expect(page.locator('[data-testid="user-message"]')).toContainText('Mobile test message');
  });
});

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 📊 **Monitoring & Analytics**

### **Performance Monitoring**
```typescript
// lib/monitoring.ts
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

        console.log('Page load time:', loadTime);

        // Send to analytics
        this.sendMetric('page_load_time', loadTime);
      });
    }
  }

  static measureComponentRender(componentName: string, renderTime: number) {
    console.log(`${componentName} render time:`, renderTime);
    this.sendMetric('component_render_time', renderTime, { component: componentName });
  }

  static measureAPICall(endpoint: string, duration: number, success: boolean) {
    console.log(`API call to ${endpoint}:`, duration, success ? 'success' : 'failed');
    this.sendMetric('api_call_duration', duration, {
      endpoint,
      success: success.toString()
    });
  }

  private static sendMetric(name: string, value: number, labels?: Record<string, string>) {
    // Send to your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: value,
        custom_parameter: labels
      });
    }
  }
}

// Custom hook for performance measurement
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      PerformanceMonitor.measureComponentRender(componentName, endTime - startTime);
    };
  }, [componentName]);
};
```

### **Error Tracking**
```typescript
// lib/errorTracking.ts
export class ErrorTracker {
  static init() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleError);
      window.addEventListener('unhandledrejection', this.handlePromiseRejection);
    }
  }

  static handleError = (event: ErrorEvent) => {
    const error = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('JavaScript Error:', error);
    this.sendError(error);
  };

  static handlePromiseRejection = (event: PromiseRejectionEvent) => {
    const error = {
      message: 'Unhandled Promise Rejection',
      reason: event.reason,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Promise Rejection:', error);
    this.sendError(error);
  };

  static logError(error: Error, context?: Record<string, any>) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server'
    };

    console.error('Application Error:', errorData);
    this.sendError(errorData);
  }

  private static sendError(error: any) {
    // Send to error tracking service (e.g., Sentry, LogRocket)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      }).catch(console.error);
    }
  }
}
```

---

This completes the comprehensive technical documentation for MindfulConnect. The documentation covers all major aspects of the platform including architecture, implementation details, deployment strategies, development workflows, testing approaches, and monitoring systems.
