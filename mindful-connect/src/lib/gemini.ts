import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if we're in demo mode
const isDemoMode = !process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY === 'your_gemini_api_key';

// Supported languages with their native names - Enhanced for India
export const supportedLanguages = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  bn: 'বাংলা (Bengali)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  ta: 'தமிழ் (Tamil)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  or: 'ଓଡ଼ିଆ (Odia)',
  as: 'অসমীয়া (Assamese)',
  ur: 'اردو (Urdu)',
  sa: 'संस्कृत (Sanskrit)',
  ne: 'नेपाली (Nepali)',
  si: 'සිංහල (Sinhala)',
  my: 'မြန်မာ (Myanmar)',
  th: 'ไทย (Thai)',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية'
};

let geminiModel: any = null;

if (!isDemoMode) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  suggestions: string[];
}

export async function analyzeTextEmotion(text: string): Promise<EmotionAnalysis> {
  if (isDemoMode) {
    // Demo mode: Simple emotion detection based on keywords
    const emotions = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'good'],
      sad: ['sad', 'depressed', 'down', 'upset', 'crying', 'hurt', 'lonely'],
      angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'hate'],
      anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil'],
    };

    const lowerText = text.toLowerCase();
    let detectedEmotion = 'neutral';
    let confidence = 0.6;

    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedEmotion = emotion;
        confidence = 0.8;
        break;
      }
    }

    const suggestions = {
      happy: ['Keep spreading that positive energy!', 'Share your joy with others', 'Remember this feeling for tough times'],
      sad: ['It\'s okay to feel sad sometimes', 'Consider talking to someone you trust', 'Try some gentle self-care activities'],
      angry: ['Take some deep breaths', 'Try counting to ten', 'Consider what\'s really bothering you'],
      anxious: ['Practice deep breathing', 'Ground yourself in the present moment', 'Remember that this feeling will pass'],
      calm: ['Enjoy this peaceful moment', 'Use this calm energy for reflection', 'Share your serenity with others'],
      neutral: ['Take a moment to check in with yourself', 'Consider what you\'re grateful for', 'You are not alone']
    };

    return {
      emotion: detectedEmotion,
      confidence,
      suggestions: suggestions[detectedEmotion as keyof typeof suggestions] || suggestions.neutral
    };
  }

  try {
    const prompt = `
    Analyze the emotional content of this text and respond in JSON format:
    "${text}"

    Provide:
    1. Primary emotion (happy, sad, angry, anxious, excited, neutral, etc.)
    2. Confidence level (0-1)
    3. 3 supportive suggestions based on the emotion

    Format: {"emotion": "...", "confidence": 0.8, "suggestions": ["...", "...", "..."]}
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text_response = response.text();

    // Parse JSON response
    const jsonMatch = text_response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback response
    return {
      emotion: 'neutral',
      confidence: 0.5,
      suggestions: ['Take a deep breath', 'Stay present', 'You are not alone']
    };
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return {
      emotion: 'neutral',
      confidence: 0.5,
      suggestions: ['Take a deep breath', 'Stay present', 'You are not alone']
    };
  }
}

export async function generateAIResponse(userMessage: string, emotion: string, language: string = 'en'): Promise<string> {
  if (isDemoMode) {
    // Demo mode: Generate contextual responses based on emotion and language
    const responses: Record<string, Record<string, string[]>> = {
      en: {
        happy: [
          "That's wonderful to hear! Your positive energy is contagious. What's bringing you the most joy today?",
          "I love seeing you so happy! It's beautiful when we can appreciate the good moments in life.",
          "Your happiness is a gift to yourself and others. How can you carry this feeling forward?"
        ],
        sad: [
          "I hear that you're going through a difficult time. It's completely normal to feel sad, and I'm here with you.",
          "Thank you for sharing your feelings with me. Sadness is a natural part of the human experience, and you don't have to face it alone.",
          "I can sense the weight you're carrying. Would you like to talk about what's on your mind?"
        ],
        anxious: [
          "I understand that you're feeling anxious. Anxiety can be overwhelming, but remember that you've gotten through difficult moments before.",
          "It's okay to feel worried. Let's focus on what's within your control right now. Can you tell me about your immediate surroundings?",
          "Anxiety can make everything feel urgent and scary. You're safe right now, and we can work through this together."
        ],
        neutral: [
          "Thank you for sharing with me. Sometimes it's okay to just be where we are without needing to feel anything specific.",
          "I appreciate you taking the time to connect. What's on your mind today?",
          "It's perfectly fine to feel neutral. How has your day been treating you?"
        ]
      },
      es: {
        happy: [
          "¡Qué maravilloso escuchar eso! Tu energía positiva es contagiosa. ¿Qué te está trayendo más alegría hoy?",
          "¡Me encanta verte tan feliz! Es hermoso cuando podemos apreciar los buenos momentos de la vida.",
          "Tu felicidad es un regalo para ti y para otros. ¿Cómo puedes llevar este sentimiento hacia adelante?"
        ],
        sad: [
          "Escucho que estás pasando por un momento difícil. Es completamente normal sentirse triste, y estoy aquí contigo.",
          "Gracias por compartir tus sentimientos conmigo. La tristeza es una parte natural de la experiencia humana.",
          "Puedo sentir el peso que llevas. ¿Te gustaría hablar sobre lo que tienes en mente?"
        ],
        anxious: [
          "Entiendo que te sientes ansioso/a. La ansiedad puede ser abrumadora, pero recuerda que has superado momentos difíciles antes.",
          "Está bien sentirse preocupado/a. Enfoquémonos en lo que está bajo tu control ahora mismo.",
          "La ansiedad puede hacer que todo se sienta urgente y aterrador. Estás seguro/a ahora mismo."
        ],
        neutral: [
          "Gracias por compartir conmigo. A veces está bien estar donde estamos sin necesidad de sentir algo específico.",
          "Aprecio que te tomes el tiempo para conectar. ¿Qué tienes en mente hoy?",
          "Está perfectamente bien sentirse neutral. ¿Cómo te ha tratado el día?"
        ]
      },
      hi: {
        happy: [
          "यह सुनना बहुत अच्छा है! आपकी सकारात्मक ऊर्जा संक्रामक है। आज आपको सबसे ज्यादा खुशी क्या दे रही है?",
          "मुझे आपको इतना खुश देखना अच्छा लगता है! जब हम जीवन के अच्छे पलों की सराहना कर सकते हैं तो यह सुंदर है।",
          "आपकी खुशी आपके और दूसरों के लिए एक उपहार है। आप इस भावना को कैसे आगे बढ़ा सकते हैं?"
        ],
        sad: [
          "मैं सुन रहा हूं कि आप एक कठिन समय से गुजर रहे हैं। उदास महसूस करना बिल्कुल सामान्य है, और मैं आपके साथ हूं।",
          "अपनी भावनाओं को मेरे साथ साझा करने के लिए धन्यवाद। उदासी मानवीय अनुभव का एक प्राकृतिक हिस्सा है।",
          "मैं आपके द्वारा उठाए जा रहे बोझ को महसूस कर सकता हूं। क्या आप इस बारे में बात करना चाहेंगे कि आपके मन में क्या है?"
        ],
        anxious: [
          "मैं समझता हूं कि आप चिंतित महसूस कर रहे हैं। चिंता भारी हो सकती है, लेकिन याद रखें कि आपने पहले भी कठिन क्षणों को पार किया है।",
          "चिंतित महसूस करना ठीक है। आइए उस पर ध्यान दें जो अभी आपके नियंत्रण में है।",
          "चिंता सब कुछ तत्काल और डरावना महसूस करा सकती है। आप अभी सुरक्षित हैं।"
        ],
        neutral: [
          "मेरे साथ साझा करने के लिए धन्यवाद। कभी-कभी बिना कुछ विशिष्ट महसूस किए हम जहां हैं वहीं रहना ठीक है।",
          "मैं आपके जुड़ने के लिए समय निकालने की सराहना करता हूं। आज आपके मन में क्या है?",
          "तटस्थ महसूस करना बिल्कुल ठीक है। आपका दिन कैसा रहा है?"
        ]
      }
    };

    const languageResponses = responses[language] || responses['en'];
    const emotionResponses = languageResponses[emotion] || languageResponses['neutral'];
    const randomResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];

    // Add some personalization based on the user's message
    const keywords = userMessage.toLowerCase().split(' ');
    let personalizedResponse = randomResponse;

    // Language-specific personalization
    const personalizations: Record<string, Record<string, string>> = {
      en: {
        work: " Work can be challenging, but remember to take care of yourself too.",
        family: " Relationships are so important for our wellbeing.",
        tired: " Rest is not a luxury, it's a necessity. Be gentle with yourself."
      },
      es: {
        work: " El trabajo puede ser desafiante, pero recuerda cuidarte también.",
        family: " Las relaciones son muy importantes para nuestro bienestar.",
        tired: " El descanso no es un lujo, es una necesidad. Sé gentil contigo mismo/a."
      },
      hi: {
        work: " काम चुनौतीपूर्ण हो सकता है, लेकिन अपना भी ख्याल रखना याद रखें।",
        family: " रिश्ते हमारी भलाई के लिए बहुत महत्वपूर्ण हैं।",
        tired: " आराम कोई विलासिता नहीं है, यह एक आवश्यकता है। अपने साथ कोमल रहें।"
      }
    };

    const langPersonalizations = personalizations[language] || personalizations['en'];

    if (keywords.includes('work') || keywords.includes('job') || keywords.includes('trabajo') || keywords.includes('काम')) {
      personalizedResponse += langPersonalizations.work;
    } else if (keywords.includes('family') || keywords.includes('friend') || keywords.includes('familia') || keywords.includes('परिवार')) {
      personalizedResponse += langPersonalizations.family;
    } else if (keywords.includes('tired') || keywords.includes('exhausted') || keywords.includes('cansado') || keywords.includes('थका')) {
      personalizedResponse += langPersonalizations.tired;
    }

    return personalizedResponse;
  }

  try {
    const prompt = `
    You are a compassionate AI mental health companion. The user is feeling ${emotion}.
    Respond to their message in ${language} language with empathy and support.
    Keep responses warm, understanding, and helpful. Offer practical advice when appropriate.

    User message: "${userMessage}"
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm here to listen and support you. How are you feeling right now?";
  }
}

export async function generateCreativeContent(emotion: string, type: 'art' | 'music' | 'story'): Promise<string> {
  if (isDemoMode) {
    // Demo mode: Pre-written creative content
    const content = {
      art: {
        happy: "Imagine a vibrant sunflower field stretching endlessly under a bright blue sky. Golden petals dance in the warm breeze, while butterflies flutter between the blooms. The painting uses warm yellows, oranges, and blues to capture pure joy and celebration of life.",
        sad: "Picture a gentle rain falling on a quiet pond, creating ripples that reflect the soft gray sky. Willow trees bend gracefully over the water, their leaves creating a natural sanctuary. The artwork uses soft blues, grays, and gentle greens to provide comfort and peace.",
        anxious: "Visualize a serene mountain lake at dawn, perfectly still and mirror-like. Soft mist rises from the water while the first rays of sunlight paint the sky in gentle pastels. The scene uses calming blues, soft pinks, and peaceful whites to promote tranquility.",
        neutral: "Envision a simple zen garden with carefully raked sand and a few perfectly placed stones. The minimalist composition focuses on balance and harmony, using earth tones and clean lines to create a sense of peaceful simplicity."
      },
      music: {
        happy: "🎵 Uplifting Playlist: 'Good as Hell' by Lizzo, 'Happy' by Pharrell Williams, 'Can't Stop the Feeling' by Justin Timberlake. Add some upbeat indie folk like 'Home' by Edward Sharpe & The Magnetic Zeros for that feel-good energy!",
        sad: "🎵 Healing Sounds: Try 'Mad World' by Gary Jules for cathartic release, then transition to 'The Night We Met' by Lord Huron. End with 'Breathe Me' by Sia. Sometimes we need to feel our emotions fully before we can heal.",
        anxious: "🎵 Calming Melodies: Start with 'Weightless' by Marconi Union (scientifically proven to reduce anxiety), add some Ludovico Einaudi piano pieces, and include nature sounds like rain or ocean waves for deep relaxation.",
        neutral: "🎵 Ambient Exploration: Try Brian Eno's 'Music for Airports', some lo-fi hip hop beats, or instrumental versions of your favorite songs. Perfect for reflection and gentle mood exploration."
      },
      story: {
        happy: "Maya discovered an old music box in her grandmother's attic. As the tiny ballerina spun to the gentle melody, she remembered all the times her grandmother had danced with her in the kitchen while cookies baked. The music box became a daily reminder that joy lives in the smallest moments, and that love transcends time. Every morning, Maya would wind it up and let the melody fill her heart with gratitude for the beautiful memories that shaped her.",
        sad: "The old oak tree had weathered many storms, its branches scarred but still strong. A young girl often sat beneath it when life felt overwhelming, finding comfort in its steady presence. One day, she noticed new growth sprouting from what seemed like a dead branch. The tree whispered its wisdom: even in our darkest moments, new life finds a way to emerge. Healing doesn't erase our scars; it transforms them into sources of strength.",
        anxious: "The lighthouse keeper had one job: to keep the light burning for ships lost in the fog. Some nights, the storms were fierce and the keeper couldn't see beyond the tower. But they trusted that the light was reaching those who needed it most. Like the lighthouse keeper, we don't always see the impact of our presence, but our steady light guides others through their darkest moments. Sometimes, being a beacon is enough.",
        neutral: "The library cat wandered between the shelves, neither hurried nor idle, simply present. Visitors often paused to watch its peaceful journey, finding something profound in its unhurried existence. The cat reminded everyone that not every moment needs to be filled with purpose or emotion. Sometimes, the most beautiful thing we can do is simply be, allowing life to unfold naturally around us."
      }
    };

    const emotionContent = content[type][emotion as keyof typeof content[typeof type]] || content[type].neutral;
    return emotionContent;
  }

  try {
    const prompts = {
      art: `Create a detailed description for a calming artwork that would help someone feeling ${emotion}. Include colors, shapes, and visual elements.`,
      music: `Suggest a playlist or music recommendations for someone feeling ${emotion}. Include genres, specific songs, or mood descriptions.`,
      story: `Write a short, uplifting story (2-3 paragraphs) for someone feeling ${emotion}. Make it inspiring and relatable.`
    };

    const result = await geminiModel.generateContent(prompts[type]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating creative content:', error);
    return `Here's something to help you feel better while you're feeling ${emotion}.`;
  }
}
