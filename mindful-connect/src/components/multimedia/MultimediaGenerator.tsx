'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, Video, Music, Play, Pause, Download, 
  Sparkles, Palette, Camera, Mic, Heart, Star,
  Volume2, VolumeX, SkipBack, SkipForward, Shuffle
} from 'lucide-react';

interface MultimediaGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  currentMood: string;
  language: string;
}

interface GeneratedContent {
  type: 'image' | 'video' | 'music';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

export default function MultimediaGenerator({ 
  isOpen, 
  onClose, 
  currentMood, 
  language 
}: MultimediaGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'music' | 'spotify'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  // Demo content based on mood and language
  const generateContent = async (type: 'image' | 'video' | 'music') => {
    setIsGenerating(true);
    
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const moodBasedContent = {
      image: {
        happy: {
          en: { title: 'Sunshine Mandala', description: 'A vibrant mandala radiating joy and positivity' },
          hi: { title: 'सूर्य मंडल', description: 'खुशी और सकारात्मकता से भरा एक जीवंत मंडल' },
          ta: { title: 'சூரிய மண்டலம்', description: 'மகிழ்ச்சி மற்றும் நேர்மறையை வெளிப்படுத்தும் ஒரு துடிப்பான மண்டலம்' }
        },
        calm: {
          en: { title: 'Peaceful Lake', description: 'A serene lake surrounded by mountains at sunset' },
          hi: { title: 'शांत झील', description: 'सूर्यास्त के समय पहाड़ों से घिरी एक शांत झील' },
          ta: { title: 'அமைதியான ஏரி', description: 'சூரிய அஸ்தமனத்தின் போது மலைகளால் சூழப்பட்ட அமைதியான ஏரி' }
        },
        sad: {
          en: { title: 'Healing Rain', description: 'Gentle raindrops on flower petals, symbolizing renewal' },
          hi: { title: 'उपचारक बारिश', description: 'फूलों की पंखुड़ियों पर कोमल बारिश की बूंदें, नवीकरण का प्रतीक' },
          ta: { title: 'குணப்படுத்தும் மழை', description: 'மலர் இதழ்களில் மென்மையான மழைத்துளிகள், புதுப்பித்தலின் அடையாளம்' }
        }
      },
      video: {
        happy: {
          en: { title: 'Dancing Colors', description: 'Animated colors dancing to uplifting music' },
          hi: { title: 'नृत्य करते रंग', description: 'उत्साहजनक संगीत पर नृत्य करते हुए रंग' },
          ta: { title: 'நடனமாடும் நிறங்கள்', description: 'உற்சாகமான இசைக்கு நடனமாடும் நிறங்கள்' }
        },
        calm: {
          en: { title: 'Meditation Journey', description: 'A peaceful journey through nature scenes' },
          hi: { title: 'ध्यान यात्रा', description: 'प्राकृतिक दृश्यों के माध्यम से एक शांतिपूर्ण यात्रा' },
          ta: { title: 'தியான பயணம்', description: 'இயற்கை காட்சிகள் வழியாக ஒரு அமைதியான பயணம்' }
        }
      },
      music: {
        happy: {
          en: { title: 'Joyful Melody', description: 'An upbeat composition to lift your spirits' },
          hi: { title: 'आनंदमय धुन', description: 'आपके मूड को बेहतर बनाने वाली एक जीवंत रचना' },
          ta: { title: 'மகிழ்ச்சியான இசை', description: 'உங்கள் மனதை உயர்த்தும் ஒரு உற்சாகமான இசை' }
        },
        calm: {
          en: { title: 'Peaceful Harmony', description: 'Soothing sounds for relaxation and meditation' },
          hi: { title: 'शांतिपूर्ण सामंजस्य', description: 'विश्राम और ध्यान के लिए सुखदायक ध्वनियां' },
          ta: { title: 'அமைதியான இணக்கம்', description: 'ஓய்வு மற்றும் தியானத்திற்கான அமைதியான ஒலிகள்' }
        }
      }
    };

    const content = moodBasedContent[type][currentMood as keyof typeof moodBasedContent[typeof type]] || 
                   moodBasedContent[type].happy;
    const langContent = content[language as keyof typeof content] || content.en;

    const newContent: GeneratedContent = {
      type,
      title: langContent.title,
      description: langContent.description,
      url: `https://example.com/${type}/${Date.now()}`,
      thumbnail: type === 'video' ? `https://picsum.photos/300/200?random=${Date.now()}` : undefined,
      duration: type === 'video' || type === 'music' ? '2:30' : undefined
    };

    setGeneratedContent(prev => [newContent, ...prev]);
    setIsGenerating(false);
  };

  // Spotify integration (demo)
  const spotifyPlaylists = [
    { id: 1, name: 'Bollywood Hits', artist: 'Various Artists', mood: 'happy', language: 'hi' },
    { id: 2, name: 'Tamil Melodies', artist: 'A.R. Rahman', mood: 'calm', language: 'ta' },
    { id: 3, name: 'Bengali Classics', artist: 'Rabindranath Tagore', mood: 'peaceful', language: 'bn' },
    { id: 4, name: 'Punjabi Beats', artist: 'Diljit Dosanjh', mood: 'energetic', language: 'pa' },
    { id: 5, name: 'Gujarati Folk', artist: 'Traditional', mood: 'cultural', language: 'gu' },
    { id: 6, name: 'Telugu Hits', artist: 'Ilaiyaraaja', mood: 'romantic', language: 'te' },
    { id: 7, name: 'Marathi Songs', artist: 'Ajay-Atul', mood: 'festive', language: 'mr' },
    { id: 8, name: 'Kannada Classics', artist: 'Hamsalekha', mood: 'nostalgic', language: 'kn' }
  ];

  const playSpotifyTrack = (trackId: number) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
    // In real implementation, integrate with Spotify Web API
    console.log('Playing Spotify track:', trackId);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Multimedia Generator
              </h2>
              <p className="opacity-90">Create images, videos, and music based on your mood</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'image', label: 'Images', icon: Image },
            { id: 'video', label: 'Videos', icon: Video },
            { id: 'music', label: 'Music', icon: Music },
            { id: 'spotify', label: 'Spotify', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'spotify' ? (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Indian Regional Music
                </h3>
                <p className="text-gray-600">Discover music in your regional language</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spotifyPlaylists.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer"
                    onClick={() => playSpotifyTrack(playlist.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{playlist.name}</h4>
                        <p className="text-sm text-gray-600">{playlist.artist}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            {playlist.mood}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {playlist.language.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors">
                        {currentTrack === playlist.id && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Generation Controls */}
              <div className="text-center">
                <button
                  onClick={() => generateContent(activeTab as 'image' | 'video' | 'music')}
                  disabled={isGenerating}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate {activeTab}</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Current mood: <span className="font-medium capitalize">{currentMood}</span>
                </p>
              </div>

              {/* Generated Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {generatedContent
                    .filter(content => content.type === activeTab)
                    .map((content, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 rounded-lg overflow-hidden"
                      >
                        {content.type === 'image' && (
                          <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <Image className="w-12 h-12 text-white" />
                          </div>
                        )}
                        
                        {content.type === 'video' && (
                          <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center relative">
                            <Video className="w-12 h-12 text-white" />
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {content.duration}
                            </div>
                          </div>
                        )}
                        
                        {content.type === 'music' && (
                          <div className="h-32 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
                            <Music className="w-12 h-12 text-white" />
                          </div>
                        )}
                        
                        <div className="p-4">
                          <h4 className="font-medium text-gray-800 mb-1">{content.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-600 py-2 px-3 rounded text-sm transition-colors">
                              <Play className="w-4 h-4 mx-auto" />
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-3 rounded text-sm transition-colors">
                              <Download className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {generatedContent.filter(content => content.type === activeTab).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeTab} generated yet. Click the generate button to create content!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
