# MindfulConnect - Architecture Diagrams

## 📋 **Table of Contents**
1. [System Architecture Overview](#system-architecture-overview)
2. [Component Architecture](#component-architecture)
3. [Data Flow Diagrams](#data-flow-diagrams)
4. [Database Schema Diagram](#database-schema-diagram)
5. [Deployment Architecture](#deployment-architecture)
6. [Security Architecture](#security-architecture)
7. [AI Processing Pipeline](#ai-processing-pipeline)
8. [Real-time Communication Flow](#real-time-communication-flow)

---

## 🏗️ **System Architecture Overview**

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[React App]
        C[Mobile Browser] --> B
        D[PWA] --> B
    end
    
    subgraph "Frontend Layer"
        B --> E[Next.js App Router]
        E --> F[React Components]
        E --> G[Context Providers]
        E --> H[Custom Hooks]
    end
    
    subgraph "API Layer"
        F --> I[API Routes]
        I --> J[Authentication Middleware]
        I --> K[Rate Limiting]
        I --> L[Validation Layer]
    end
    
    subgraph "Service Layer"
        L --> M[Chat Service]
        L --> N[Emotion Service]
        L --> O[User Service]
        L --> P[Emergency Service]
        L --> Q[Multimedia Service]
    end
    
    subgraph "External Services"
        M --> R[Google Gemini AI]
        N --> S[Google Cloud Vision]
        O --> T[Firebase Auth]
        P --> U[Crisis Helplines API]
        Q --> V[Spotify API]
    end
    
    subgraph "Data Layer"
        T --> W[Firestore Database]
        M --> W
        N --> W
        O --> W
        P --> W
    end
    
    subgraph "Infrastructure"
        W --> X[Firebase Hosting]
        W --> Y[Vercel Deployment]
        W --> Z[GitHub Pages]
    end
```

---

## 🧩 **Component Architecture**

```mermaid
graph TD
    subgraph "App Structure"
        A[App Layout] --> B[Landing Page]
        A --> C[Chat Interface]
        A --> D[Virtual World]
        A --> E[Emergency Panel]
    end
    
    subgraph "Chat Components"
        C --> F[Message List]
        C --> G[Input Area]
        C --> H[Emotion Display]
        C --> I[AI Avatar]
        F --> J[Message Bubble]
        F --> K[Typing Indicator]
        G --> L[Voice Input]
        G --> M[Text Input]
    end
    
    subgraph "Shared Components"
        N[Button] --> C
        N --> D
        N --> E
        O[Modal] --> C
        O --> D
        O --> E
        P[Loading Spinner] --> C
        P --> D
        P --> E
    end
    
    subgraph "Context Providers"
        Q[Auth Context] --> A
        R[Chat Context] --> C
        S[Emotion Context] --> C
        T[Language Context] --> A
    end
    
    subgraph "Custom Hooks"
        U[useAuth] --> Q
        V[useChat] --> R
        W[useEmotion] --> S
        X[useLanguage] --> T
    end
```

---

## 🔄 **Data Flow Diagrams**

### **Chat Message Flow**
```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat Component
    participant E as Emotion Service
    participant A as AI Service
    participant D as Database
    
    U->>C: Types message
    C->>E: Analyze emotion
    E-->>C: Return emotion data
    C->>A: Send message + emotion
    A->>A: Generate AI response
    A-->>C: Return AI response
    C->>D: Save conversation
    D-->>C: Confirm saved
    C->>U: Display AI response
```

### **Emergency Detection Flow**
```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat Component
    participant E as Emergency Service
    participant H as Helpline API
    participant N as Notification Service
    
    U->>C: Sends crisis message
    C->>E: Analyze for crisis keywords
    E->>E: Calculate risk score
    alt High Risk Detected
        E->>H: Get emergency contacts
        H-->>E: Return helplines
        E->>N: Trigger emergency alert
        E-->>C: Return crisis response
        C->>U: Show emergency panel
    else Low Risk
        E-->>C: Return normal response
        C->>U: Continue conversation
    end
```

### **Video Call Setup Flow**
```mermaid
sequenceDiagram
    participant U as User
    participant V as Video Component
    participant W as WebRTC Service
    participant A as AI Avatar
    participant S as Signaling Server
    
    U->>V: Click video call
    V->>W: Request call setup
    W->>S: Create room
    S-->>W: Return room ID
    W->>A: Initialize AI avatar
    A-->>W: Avatar ready
    W->>V: Setup peer connection
    V->>U: Start video call
    
    loop During Call
        U->>V: Send video/audio
        V->>A: Forward to AI
        A->>A: Process emotion
        A->>V: Generate response
        V->>U: Display AI response
    end
```

---

## 🗄️ **Database Schema Diagram**

```mermaid
erDiagram
    USERS {
        string id PK
        string email
        string displayName
        boolean isAnonymous
        object preferences
        object stats
        object mentalHealthData
        timestamp createdAt
        timestamp updatedAt
    }
    
    SESSIONS {
        string id PK
        string userId FK
        timestamp startTime
        timestamp endTime
        number duration
        number messageCount
        string primaryEmotion
        array emotionChanges
        array topics
        object quality
        object flags
    }
    
    MESSAGES {
        string id PK
        string sessionId FK
        string userId FK
        string type
        string content
        string language
        object emotion
        object metadata
        timestamp timestamp
        boolean isEdited
    }
    
    EMOTIONS {
        string id PK
        string userId FK
        string sessionId FK
        string emotion
        number confidence
        string source
        string context
        timestamp timestamp
        object metadata
    }
    
    EMERGENCY_CONTACTS {
        string id PK
        string name
        string phone
        string type
        string region
        array languages
        object availability
        boolean isVerified
        number priority
    }
    
    USERS ||--o{ SESSIONS : has
    SESSIONS ||--o{ MESSAGES : contains
    USERS ||--o{ EMOTIONS : generates
    SESSIONS ||--o{ EMOTIONS : tracks
```

---

## 🚀 **Deployment Architecture**

```mermaid
graph TB
    subgraph "Development"
        A[Local Development] --> B[Git Repository]
        B --> C[GitHub Actions]
    end
    
    subgraph "CI/CD Pipeline"
        C --> D[Build & Test]
        D --> E[Security Scan]
        E --> F[Deploy to Staging]
        F --> G[Integration Tests]
        G --> H[Deploy to Production]
    end
    
    subgraph "Staging Environment"
        F --> I[Vercel Preview]
        F --> J[Firebase Staging]
    end
    
    subgraph "Production Environment"
        H --> K[Vercel Production]
        H --> L[Firebase Production]
        H --> M[GitHub Pages]
    end
    
    subgraph "Monitoring"
        K --> N[Performance Monitoring]
        L --> O[Error Tracking]
        M --> P[Analytics]
    end
    
    subgraph "CDN & Edge"
        K --> Q[Vercel Edge Network]
        L --> R[Firebase CDN]
        M --> S[GitHub CDN]
    end
```

---

## 🔒 **Security Architecture**

```mermaid
graph TD
    subgraph "Client Security"
        A[HTTPS Only] --> B[Content Security Policy]
        B --> C[XSS Protection]
        C --> D[Input Sanitization]
    end
    
    subgraph "Authentication Layer"
        E[Firebase Auth] --> F[JWT Tokens]
        F --> G[Token Validation]
        G --> H[Session Management]
    end
    
    subgraph "API Security"
        I[Rate Limiting] --> J[Request Validation]
        J --> K[Authorization Checks]
        K --> L[Data Encryption]
    end
    
    subgraph "Data Protection"
        M[Firestore Security Rules] --> N[Field-level Encryption]
        N --> O[PII Anonymization]
        O --> P[Data Retention Policies]
    end
    
    subgraph "Infrastructure Security"
        Q[WAF Protection] --> R[DDoS Mitigation]
        R --> S[SSL/TLS Encryption]
        S --> T[Security Headers]
    end
    
    D --> G
    H --> K
    L --> N
    P --> T
```

---

## 🤖 **AI Processing Pipeline**

```mermaid
graph LR
    subgraph "Input Processing"
        A[User Input] --> B[Text Preprocessing]
        A --> C[Voice Processing]
        A --> D[Image Processing]
    end
    
    subgraph "Emotion Analysis"
        B --> E[Text Emotion Detection]
        C --> F[Voice Emotion Analysis]
        D --> G[Facial Emotion Recognition]
    end
    
    subgraph "Context Building"
        E --> H[Emotion Fusion]
        F --> H
        G --> H
        H --> I[Context Enrichment]
        I --> J[Historical Analysis]
    end
    
    subgraph "AI Response Generation"
        J --> K[Prompt Engineering]
        K --> L[Gemini AI Processing]
        L --> M[Response Filtering]
        M --> N[Cultural Adaptation]
    end
    
    subgraph "Output Generation"
        N --> O[Text Response]
        N --> P[Voice Synthesis]
        N --> Q[Avatar Animation]
        N --> R[Multimedia Content]
    end
    
    subgraph "Feedback Loop"
        O --> S[Response Quality Check]
        P --> S
        Q --> S
        R --> S
        S --> T[Model Fine-tuning]
        T --> L
    end
```

---

## 📡 **Real-time Communication Flow**

```mermaid
graph TD
    subgraph "Client Side"
        A[User Browser] --> B[WebRTC Peer Connection]
        B --> C[Media Stream]
        C --> D[Audio/Video Capture]
    end
    
    subgraph "Signaling Server"
        E[WebSocket Connection] --> F[Room Management]
        F --> G[Peer Discovery]
        G --> H[ICE Candidate Exchange]
    end
    
    subgraph "TURN/STUN Servers"
        I[STUN Server] --> J[NAT Traversal]
        K[TURN Server] --> L[Relay Traffic]
    end
    
    subgraph "AI Avatar System"
        M[3D Avatar Engine] --> N[Emotion Processing]
        N --> O[Animation Controller]
        O --> P[Voice Synthesis]
    end
    
    subgraph "Real-time Processing"
        Q[Emotion Detection] --> R[Response Generation]
        R --> S[Avatar Control]
        S --> T[Audio/Video Output]
    end
    
    B --> E
    D --> Q
    H --> I
    H --> K
    P --> T
    T --> A
```

---

## 🌐 **Multi-Language Processing Architecture**

```mermaid
graph TB
    subgraph "Language Detection"
        A[User Input] --> B[Language Identification]
        B --> C[Script Detection]
        C --> D[Regional Variant]
    end
    
    subgraph "Processing Pipeline"
        D --> E[Language-Specific Preprocessing]
        E --> F[Cultural Context Loading]
        F --> G[Emotion Keywords Mapping]
        G --> H[AI Model Selection]
    end
    
    subgraph "Response Generation"
        H --> I[Multilingual AI Processing]
        I --> J[Cultural Adaptation]
        J --> K[Regional Customization]
        K --> L[Response Formatting]
    end
    
    subgraph "Output Rendering"
        L --> M[Text Rendering]
        L --> N[Voice Synthesis]
        L --> O[UI Localization]
        M --> P[Font Selection]
        N --> Q[Voice Model Selection]
        O --> R[Layout Adjustment]
    end
    
    subgraph "Supported Languages"
        S[Hindi - हिन्दी]
        T[Bengali - বাংলা]
        U[Telugu - తెలుగు]
        V[Tamil - தமிழ்]
        W[Marathi - मराठी]
        X[Gujarati - ગુજરાતી]
        Y[Kannada - ಕನ್ನಡ]
        Z[Malayalam - മലയാളം]
    end
    
    H --> S
    H --> T
    H --> U
    H --> V
    H --> W
    H --> X
    H --> Y
    H --> Z
```

---

These architecture diagrams provide a comprehensive visual representation of the MindfulConnect platform's technical structure, data flows, and system interactions. Each diagram illustrates different aspects of the system to help developers, architects, and stakeholders understand the platform's complexity and design decisions.
