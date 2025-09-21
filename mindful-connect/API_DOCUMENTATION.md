# MindfulConnect API Documentation

## 📋 **Table of Contents**
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Chat API](#chat-api)
4. [Emotion Detection API](#emotion-detection-api)
5. [User Management API](#user-management-api)
6. [Emergency Services API](#emergency-services-api)
7. [Multimedia Generation API](#multimedia-generation-api)
8. [WebRTC Video Call API](#webrtc-video-call-api)
9. [Error Handling](#error-handling)
10. [Rate Limiting](#rate-limiting)

---

## 🌐 **API Overview**

### **Base URLs**
```
Production:  https://mindfulconnect.ai/api
Staging:     https://staging.mindfulconnect.ai/api
Development: http://localhost:3000/api
Demo:        Static responses (no backend required)
```

### **API Versioning**
```
Current Version: v1
Header: API-Version: v1
URL Pattern: /api/v1/{endpoint}
```

### **Request/Response Format**
```typescript
// Standard Request Format
interface APIRequest<T = any> {
  data: T;
  metadata?: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}

// Standard Response Format
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    requestId: string;
    timestamp: string;
    processingTime: number;
  };
}
```

---

## 🔐 **Authentication**

### **Authentication Methods**
```typescript
// Firebase Authentication Token
interface AuthToken {
  token: string;
  expiresAt: string;
  refreshToken: string;
}

// Demo Mode (No Authentication Required)
interface DemoUser {
  id: 'demo-user';
  isDemo: true;
  permissions: string[];
}
```

### **Authentication Endpoints**

#### **POST /api/v1/auth/anonymous**
Create anonymous user session
```typescript
// Request
{
  "deviceId": "unique-device-identifier",
  "preferences": {
    "language": "en",
    "region": "IN"
  }
}

// Response
{
  "success": true,
  "data": {
    "userId": "anon_123456789",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": "2024-01-01T12:00:00Z",
    "isAnonymous": true
  }
}
```

#### **POST /api/v1/auth/google**
Google OAuth authentication
```typescript
// Request
{
  "idToken": "google-id-token",
  "accessToken": "google-access-token"
}

// Response
{
  "success": true,
  "data": {
    "userId": "google_user_123",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "email": "user@example.com",
      "displayName": "User Name",
      "photoURL": "https://..."
    }
  }
}
```

---

## 💬 **Chat API**

### **POST /api/v1/chat/message**
Send message to AI companion
```typescript
// Request
{
  "message": "I'm feeling anxious about my job interview tomorrow",
  "sessionId": "session_123",
  "language": "en",
  "context": {
    "previousEmotion": "neutral",
    "timeOfDay": "evening",
    "userPreferences": {
      "aiPersonality": "empathetic",
      "responseLength": "medium"
    }
  }
}

// Response
{
  "success": true,
  "data": {
    "messageId": "msg_456",
    "aiResponse": "I understand that job interviews can feel overwhelming. It's completely normal to feel anxious before an important interview. Would you like to talk about some strategies that might help you feel more prepared and confident?",
    "emotion": {
      "detected": "anxious",
      "confidence": 0.85,
      "suggestions": [
        "Practice deep breathing exercises",
        "Prepare answers to common questions",
        "Visualize a successful interview"
      ]
    },
    "metadata": {
      "responseTime": 1250,
      "model": "gemini-pro",
      "language": "en",
      "tokens": 45
    }
  }
}
```

### **GET /api/v1/chat/history**
Retrieve chat history
```typescript
// Query Parameters
{
  "sessionId": "session_123",
  "limit": 50,
  "offset": 0,
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}

// Response
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123",
        "type": "user",
        "content": "Hello",
        "timestamp": "2024-01-15T10:30:00Z",
        "emotion": "neutral"
      },
      {
        "id": "msg_124",
        "type": "ai",
        "content": "Hello! How are you feeling today?",
        "timestamp": "2024-01-15T10:30:02Z",
        "metadata": {
          "model": "gemini-pro",
          "responseTime": 800
        }
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### **POST /api/v1/chat/session**
Create new chat session
```typescript
// Request
{
  "userId": "user_123",
  "preferences": {
    "language": "hi",
    "aiPersonality": "empathetic",
    "voiceEnabled": true
  }
}

// Response
{
  "success": true,
  "data": {
    "sessionId": "session_789",
    "startTime": "2024-01-15T10:00:00Z",
    "aiGreeting": "नमस्ते! मैं आपका AI साथी हूं। आज आप कैसा महसूस कर रहे हैं?",
    "settings": {
      "language": "hi",
      "aiPersonality": "empathetic",
      "voiceEnabled": true
    }
  }
}
```

---

## 🎭 **Emotion Detection API**

### **POST /api/v1/emotion/analyze-text**
Analyze emotion from text
```typescript
// Request
{
  "text": "I'm feeling really overwhelmed with work lately",
  "language": "en",
  "context": {
    "previousEmotions": ["neutral", "stressed"],
    "timeOfDay": "afternoon",
    "userHistory": {
      "commonTriggers": ["work", "deadlines"]
    }
  }
}

// Response
{
  "success": true,
  "data": {
    "primaryEmotion": "overwhelmed",
    "confidence": 0.92,
    "emotionBreakdown": {
      "overwhelmed": 0.92,
      "stressed": 0.78,
      "anxious": 0.65,
      "tired": 0.45
    },
    "triggers": ["work", "overwhelmed"],
    "suggestions": [
      "Take short breaks throughout the day",
      "Practice time management techniques",
      "Consider talking to your supervisor about workload"
    ],
    "severity": "moderate",
    "recommendedActions": [
      "breathing_exercise",
      "time_management_tips",
      "stress_reduction_techniques"
    ]
  }
}
```

### **POST /api/v1/emotion/analyze-voice**
Analyze emotion from voice/audio
```typescript
// Request (multipart/form-data)
{
  "audio": File, // Audio file (WAV, MP3, etc.)
  "language": "en",
  "duration": 5.2
}

// Response
{
  "success": true,
  "data": {
    "emotion": "sad",
    "confidence": 0.87,
    "voiceFeatures": {
      "pitch": "low",
      "speed": "slow",
      "volume": "quiet",
      "tone": "monotone"
    },
    "transcription": "I don't know what to do anymore",
    "recommendations": [
      "The voice analysis suggests you might be feeling down",
      "Would you like to talk about what's troubling you?"
    ]
  }
}
```

### **POST /api/v1/emotion/analyze-facial**
Analyze emotion from facial expression (camera)
```typescript
// Request
{
  "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Response
{
  "success": true,
  "data": {
    "emotions": {
      "happy": 0.15,
      "sad": 0.75,
      "angry": 0.05,
      "surprised": 0.02,
      "neutral": 0.03
    },
    "primaryEmotion": "sad",
    "confidence": 0.75,
    "facialFeatures": {
      "eyebrows": "lowered",
      "eyes": "droopy",
      "mouth": "downturned"
    },
    "recommendations": [
      "Your facial expression suggests you might be feeling sad",
      "Would you like to share what's on your mind?"
    ]
  }
}
```

---

## 👤 **User Management API**

### **GET /api/v1/user/profile**
Get user profile
```typescript
// Response
{
  "success": true,
  "data": {
    "userId": "user_123",
    "profile": {
      "displayName": "John Doe",
      "email": "john@example.com",
      "avatar": "https://...",
      "preferences": {
        "language": "en",
        "aiPersonality": "empathetic",
        "notifications": true,
        "voiceEnabled": true
      },
      "stats": {
        "totalSessions": 45,
        "totalMessages": 1250,
        "averageSessionDuration": 15.5,
        "joinDate": "2024-01-01T00:00:00Z",
        "lastActive": "2024-01-15T10:30:00Z",
        "level": 5,
        "xp": 2750,
        "badges": ["first_chat", "week_streak", "emotion_aware"]
      }
    }
  }
}
```

### **PUT /api/v1/user/preferences**
Update user preferences
```typescript
// Request
{
  "language": "hi",
  "aiPersonality": "wise",
  "notifications": {
    "dailyCheckIn": true,
    "emergencyAlerts": true,
    "weeklyReport": false
  },
  "privacy": {
    "dataRetention": "6_months",
    "shareAnalytics": false
  }
}

// Response
{
  "success": true,
  "data": {
    "updated": true,
    "preferences": {
      "language": "hi",
      "aiPersonality": "wise",
      "notifications": {
        "dailyCheckIn": true,
        "emergencyAlerts": true,
        "weeklyReport": false
      }
    }
  }
}
```

### **GET /api/v1/user/analytics**
Get user mental health analytics
```typescript
// Response
{
  "success": true,
  "data": {
    "emotionTrends": {
      "last7Days": [
        { "date": "2024-01-09", "primaryEmotion": "happy", "score": 7.5 },
        { "date": "2024-01-10", "primaryEmotion": "neutral", "score": 6.0 },
        { "date": "2024-01-11", "primaryEmotion": "anxious", "score": 4.2 }
      ],
      "last30Days": {
        "averageScore": 6.8,
        "mostCommonEmotion": "neutral",
        "improvementTrend": "positive"
      }
    },
    "insights": [
      "Your mood has been generally stable this week",
      "You tend to feel more positive in the mornings",
      "Work-related topics often correlate with stress"
    ],
    "recommendations": [
      "Continue your morning routine as it seems to boost your mood",
      "Consider stress management techniques for work situations"
    ]
  }
}
```

---

## 🚨 **Emergency Services API**

### **POST /api/v1/emergency/detect**
Crisis detection and response
```typescript
// Request
{
  "message": "I can't take this anymore, I want to end it all",
  "userId": "user_123",
  "sessionId": "session_456",
  "context": {
    "recentEmotions": ["sad", "hopeless", "desperate"],
    "riskFactors": ["isolation", "job_loss"]
  }
}

// Response
{
  "success": true,
  "data": {
    "crisisLevel": "high",
    "riskScore": 0.95,
    "immediateActions": [
      "connect_crisis_counselor",
      "show_emergency_contacts",
      "safety_planning"
    ],
    "response": "I'm very concerned about what you've shared. Your safety is the most important thing right now. I'm here to help you through this difficult time. Would you like me to connect you with a crisis counselor who can provide immediate support?",
    "emergencyContacts": [
      {
        "name": "KIRAN Mental Health Helpline",
        "phone": "1800-599-0019",
        "available": "24/7",
        "type": "crisis_line"
      },
      {
        "name": "Vandrevala Foundation",
        "phone": "9999666555",
        "available": "24/7",
        "type": "crisis_line"
      }
    ],
    "followUpRequired": true
  }
}
```

### **GET /api/v1/emergency/contacts**
Get emergency contacts by region
```typescript
// Query Parameters
{
  "region": "IN",
  "state": "Maharashtra",
  "language": "hi",
  "type": "crisis_line"
}

// Response
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "kiran_helpline",
        "name": "KIRAN Mental Health Helpline",
        "phone": "1800-599-0019",
        "type": "crisis_line",
        "languages": ["hi", "en", "bn", "te"],
        "availability": "24/7",
        "region": "IN",
        "specialization": ["suicide_prevention", "mental_health"],
        "verified": true
      },
      {
        "id": "vandrevala_foundation",
        "name": "Vandrevala Foundation",
        "phone": "9999666555",
        "type": "crisis_line",
        "languages": ["hi", "en"],
        "availability": "24/7",
        "region": "IN",
        "specialization": ["crisis_counseling", "suicide_prevention"],
        "verified": true
      }
    ]
  }
}
```

---

## 🎨 **Multimedia Generation API**

### **POST /api/v1/multimedia/generate-image**
Generate therapeutic images based on mood
```typescript
// Request
{
  "prompt": "peaceful mountain landscape for anxiety relief",
  "emotion": "anxious",
  "style": "calming",
  "culturalContext": "indian",
  "preferences": {
    "colors": ["blue", "green"],
    "elements": ["nature", "water"]
  }
}

// Response
{
  "success": true,
  "data": {
    "imageUrl": "https://storage.googleapis.com/mindful-images/generated_123.jpg",
    "thumbnailUrl": "https://storage.googleapis.com/mindful-images/thumb_123.jpg",
    "metadata": {
      "generationTime": 3.2,
      "model": "dall-e-3",
      "resolution": "1024x1024",
      "style": "calming"
    },
    "therapeuticValue": {
      "calmingScore": 0.92,
      "positivityScore": 0.88,
      "culturalRelevance": 0.95
    }
  }
}
```

### **POST /api/v1/multimedia/generate-music**
Generate therapeutic music
```typescript
// Request
{
  "emotion": "sad",
  "duration": 300, // 5 minutes
  "genre": "ambient",
  "culturalStyle": "indian_classical",
  "instruments": ["sitar", "tabla", "flute"]
}

// Response
{
  "success": true,
  "data": {
    "audioUrl": "https://storage.googleapis.com/mindful-audio/generated_456.mp3",
    "duration": 300,
    "metadata": {
      "bpm": 60,
      "key": "C_major",
      "instruments": ["sitar", "tabla", "flute"],
      "generationTime": 15.7
    },
    "therapeuticProperties": {
      "relaxationScore": 0.94,
      "emotionalResonance": 0.87,
      "culturalAuthenticity": 0.91
    }
  }
}
```

---

## 📹 **WebRTC Video Call API**

### **POST /api/v1/video/create-room**
Create video call room with AI avatar
```typescript
// Request
{
  "userId": "user_123",
  "avatarPersonality": "empathetic",
  "language": "en",
  "sessionType": "therapy"
}

// Response
{
  "success": true,
  "data": {
    "roomId": "room_789",
    "iceServers": [
      {
        "urls": "stun:stun.l.google.com:19302"
      },
      {
        "urls": "turn:turn.mindfulconnect.ai:3478",
        "username": "user123",
        "credential": "temp_password"
      }
    ],
    "avatarConfig": {
      "personality": "empathetic",
      "appearance": "friendly_female",
      "voice": "natural_female_en"
    },
    "sessionSettings": {
      "maxDuration": 3600, // 1 hour
      "recordingEnabled": false,
      "emotionDetection": true
    }
  }
}
```

### **POST /api/v1/video/join-room**
Join existing video call room
```typescript
// Request
{
  "roomId": "room_789",
  "userId": "user_123",
  "mediaConstraints": {
    "video": true,
    "audio": true
  }
}

// Response
{
  "success": true,
  "data": {
    "joined": true,
    "participants": [
      {
        "id": "ai_avatar",
        "type": "ai",
        "status": "connected"
      },
      {
        "id": "user_123",
        "type": "user",
        "status": "connected"
      }
    ],
    "sessionInfo": {
      "startTime": "2024-01-15T10:30:00Z",
      "duration": 0,
      "features": ["emotion_detection", "real_time_analysis"]
    }
  }
}
```

---

## ❌ **Error Handling**

### **Standard Error Codes**
```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Common Error Codes
const ERROR_CODES = {
  // Authentication Errors (1000-1099)
  INVALID_TOKEN: '1001',
  TOKEN_EXPIRED: '1002',
  INSUFFICIENT_PERMISSIONS: '1003',
  
  // Validation Errors (1100-1199)
  INVALID_INPUT: '1101',
  MISSING_REQUIRED_FIELD: '1102',
  INVALID_FORMAT: '1103',
  
  // Rate Limiting (1200-1299)
  RATE_LIMIT_EXCEEDED: '1201',
  QUOTA_EXCEEDED: '1202',
  
  // AI Service Errors (1300-1399)
  AI_SERVICE_UNAVAILABLE: '1301',
  AI_RESPONSE_TIMEOUT: '1302',
  AI_CONTENT_FILTERED: '1303',
  
  // Emergency Errors (1400-1499)
  CRISIS_DETECTION_FAILED: '1401',
  EMERGENCY_SERVICE_UNAVAILABLE: '1402',
  
  // Server Errors (5000-5099)
  INTERNAL_SERVER_ERROR: '5001',
  DATABASE_ERROR: '5002',
  EXTERNAL_SERVICE_ERROR: '5003'
};
```

### **Error Response Examples**
```typescript
// Validation Error
{
  "success": false,
  "error": {
    "code": "1102",
    "message": "Missing required field: message",
    "details": {
      "field": "message",
      "expectedType": "string",
      "received": null
    }
  },
  "metadata": {
    "requestId": "req_123",
    "timestamp": "2024-01-15T10:30:00Z",
    "processingTime": 5
  }
}

// Rate Limit Error
{
  "success": false,
  "error": {
    "code": "1201",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 100,
      "window": "1 hour",
      "resetTime": "2024-01-15T11:30:00Z"
    }
  }
}
```

---

## ⏱️ **Rate Limiting**

### **Rate Limit Headers**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
X-RateLimit-Window: 3600
```

### **Rate Limits by Endpoint**
```typescript
const RATE_LIMITS = {
  '/api/v1/chat/message': {
    limit: 60,
    window: '1 minute',
    burst: 10
  },
  '/api/v1/emotion/analyze-text': {
    limit: 100,
    window: '1 hour',
    burst: 20
  },
  '/api/v1/multimedia/generate-image': {
    limit: 10,
    window: '1 hour',
    burst: 2
  },
  '/api/v1/video/create-room': {
    limit: 5,
    window: '1 hour',
    burst: 1
  }
};
```

---

This API documentation provides comprehensive details for integrating with the MindfulConnect platform, covering all major endpoints and functionality.
