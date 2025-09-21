'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Music, BookOpen, Image, Download, Share, Heart, Sparkles } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'art' | 'music' | 'story' | 'image';
  title: string;
  content: string;
  mood: string;
  timestamp: Date;
  likes: number;
}

interface MoodContentGeneratorProps {
  currentMood: string;
  userLanguage: string;
}

export default function MoodContentGenerator({ currentMood, userLanguage }: MoodContentGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'art' | 'music' | 'story' | 'image'>('art');
  const [generatedContent, setGeneratedContent] = useState<ContentItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async (type: 'art' | 'music' | 'story' | 'image') => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const contentTemplates = {
      art: {
        happy: {
          title: "Sunshine Meadow",
          content: "A vibrant digital painting featuring a sunlit meadow with wildflowers dancing in the breeze. Golden sunlight filters through fluffy white clouds, casting warm shadows on emerald grass. Butterflies with iridescent wings flutter between daisies and poppies, while a gentle stream reflects the azure sky. The artwork uses warm yellows, bright oranges, and soft greens to evoke pure joy and celebration of life's beautiful moments.",
        },
        sad: {
          title: "Gentle Rain",
          content: "A serene watercolor depicting soft rain falling on a quiet pond surrounded by weeping willows. The muted palette of blues, grays, and gentle purples creates a peaceful atmosphere for reflection. Ripples spread across the water's surface as raindrops create delicate patterns. A small wooden bench sits empty under a willow tree, inviting contemplation and healing.",
        },
        anxious: {
          title: "Mountain Sanctuary",
          content: "A calming landscape showing a pristine mountain lake at dawn. Mist rises gently from the still water while the first rays of sunlight paint the sky in soft pastels. Pine trees stand as silent guardians around the lake, their reflection creating perfect symmetry. The artwork uses cool blues, soft pinks, and peaceful whites to promote tranquility and inner peace.",
        },
        neutral: {
          title: "Zen Garden",
          content: "A minimalist composition featuring a traditional Japanese zen garden. Carefully raked sand creates flowing patterns around three perfectly placed stones. A single cherry blossom branch extends into the frame, its delicate pink petals contrasting with the monochromatic sand. The artwork emphasizes balance, simplicity, and mindful presence.",
        }
      },
      music: {
        happy: {
          title: "Uplifting Vibes Playlist",
          content: "🎵 Feel-Good Anthems:\n• 'Good as Hell' by Lizzo - Empowering self-love anthem\n• 'Happy' by Pharrell Williams - Infectious joy and positivity\n• 'Can't Stop the Feeling' by Justin Timberlake - Pure dance energy\n• 'Walking on Sunshine' by Katrina & The Waves - Classic feel-good vibes\n• 'Best Day of My Life' by American Authors - Optimistic indie rock\n\n🎼 Bonus: Add some upbeat acoustic covers and world music for variety!",
        },
        sad: {
          title: "Healing Harmonies",
          content: "🎵 Emotional Release & Comfort:\n• 'Mad World' by Gary Jules - Cathartic and understanding\n• 'The Night We Met' by Lord Huron - Beautiful melancholy\n• 'Breathe Me' by Sia - Raw vulnerability and hope\n• 'Hurt' by Johnny Cash - Deep emotional resonance\n• 'Black' by Pearl Jam - Processing difficult emotions\n\n🎼 Follow with gentle instrumentals by Ólafur Arnalds for healing.",
        },
        anxious: {
          title: "Calming Soundscapes",
          content: "🎵 Anxiety Relief & Relaxation:\n• 'Weightless' by Marconi Union - Scientifically proven to reduce anxiety\n• 'Spiegel im Spiegel' by Arvo Pärt - Minimalist peace\n• 'On Earth as It Is in Heaven' by Ólafur Arnalds - Ethereal calm\n• Nature sounds: Rain, ocean waves, forest ambience\n• Binaural beats at 40Hz for focus and calm\n\n🎼 Perfect for meditation and deep breathing exercises.",
        },
        neutral: {
          title: "Ambient Exploration",
          content: "🎵 Contemplative Soundscapes:\n• 'Music for Airports' by Brian Eno - Pioneering ambient music\n• Lo-fi hip hop beats - Gentle rhythm for reflection\n• 'Sleep Baby Sleep' by Broods - Dreamy and introspective\n• Instrumental versions of favorite songs\n• Classical piano pieces by Ludovico Einaudi\n\n🎼 Perfect background for journaling or quiet activities.",
        }
      },
      story: {
        happy: {
          title: "The Music Box Memory",
          content: "Maya discovered her grandmother's old music box in the attic, its tiny ballerina frozen mid-spin. As she wound the delicate key, a familiar melody filled the dusty space—the same tune her grandmother hummed while baking cookies. Suddenly, Maya was eight again, dancing in the kitchen while flour dusted the counters and love filled the air.\n\nThe music box became Maya's daily reminder that joy lives in the smallest moments. Every morning, she would wind it up and let the melody fill her heart with gratitude. The tiny ballerina spun with renewed purpose, carrying forward the love that transcends time and connects generations through the simple magic of a cherished memory.",
        },
        sad: {
          title: "The Lighthouse Keeper's Wisdom",
          content: "The old oak tree had weathered countless storms, its branches scarred but unbroken. Emma often sat beneath its protective canopy when life felt overwhelming, finding comfort in its steady presence. One autumn day, she noticed new growth sprouting from what appeared to be a dead branch—tiny green leaves reaching toward the light.\n\nThe tree seemed to whisper its ancient wisdom: even in our darkest moments, new life finds a way to emerge. Healing doesn't erase our scars; it transforms them into sources of strength. Emma touched the rough bark and felt the tree's resilience flow into her own heart, reminding her that growth often comes from the places where we've been most broken.",
        },
        anxious: {
          title: "The Steady Light",
          content: "The lighthouse keeper had one sacred duty: to keep the beacon burning for ships lost in the fog. During fierce storms when visibility was zero, the keeper couldn't see beyond the tower walls. Yet they trusted that their light was reaching those who needed it most, cutting through darkness and uncertainty.\n\nLike the lighthouse keeper, we don't always see the impact of our presence in the world. But our steady light—our kindness, our persistence, our simple act of showing up—guides others through their darkest moments. Sometimes, being a beacon of hope is enough, even when we can't see the ships we're helping to safety.",
        },
        neutral: {
          title: "The Library Cat's Philosophy",
          content: "The library cat wandered between towering shelves with unhurried grace, neither seeking nor avoiding the visitors who paused to watch. Its peaceful journey through the quiet aisles reminded everyone that not every moment needs to be filled with purpose or intense emotion.\n\nVisitors often found themselves slowing down, inspired by the cat's contentment with simply being present. In a world that demands constant motion and feeling, the cat offered a different wisdom: sometimes the most beautiful thing we can do is exist peacefully, allowing life to unfold naturally around us while we remain centered in the gentle rhythm of our own breath.",
        }
      },
      image: {
        happy: {
          title: "Joyful Mandala",
          content: "A vibrant mandala design featuring sunburst patterns in warm yellows and oranges, with intricate geometric flowers radiating from the center. The design incorporates symbols of happiness: butterflies, hearts, and spiraling energy patterns that seem to dance with life. Perfect for coloring or meditation, this mandala captures the essence of pure joy and celebration.",
        },
        sad: {
          title: "Healing Waters",
          content: "A gentle abstract image of flowing water in soft blues and purples, with subtle silver highlights that catch the light like tears transformed into something beautiful. The flowing patterns suggest movement and release, while the cool colors provide comfort and peace. This image serves as a visual reminder that emotions, like water, are meant to flow and eventually find their way to calm.",
        },
        anxious: {
          title: "Breathing Circles",
          content: "A series of concentric circles in calming gradients from deep blue to soft white, designed to guide breathing exercises. Each circle represents an inhale or exhale, with gentle pulsing animations that help regulate breathing patterns. The image includes subtle nature elements like leaves and clouds to connect the viewer with the natural rhythm of breath and life.",
        },
        neutral: {
          title: "Balanced Stones",
          content: "A minimalist image of perfectly balanced river stones stacked in harmony, photographed against a soft, neutral background. The composition emphasizes balance, stability, and the beauty found in simplicity. Each stone represents a moment of mindfulness, creating a visual metaphor for finding equilibrium in life's constant changes.",
        }
      }
    };

    const moodContent = contentTemplates[type][currentMood as keyof typeof contentTemplates[typeof type]] || 
                       contentTemplates[type].neutral;

    const newContent: ContentItem = {
      id: Date.now().toString(),
      type,
      title: moodContent.title,
      content: moodContent.content,
      mood: currentMood,
      timestamp: new Date(),
      likes: Math.floor(Math.random() * 50) + 10
    };

    setGeneratedContent(prev => [newContent, ...prev]);
    setIsGenerating(false);
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'art': return <Palette className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'story': return <BookOpen className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'sad': return 'from-blue-400 to-blue-600';
      case 'anxious': return 'from-purple-400 to-purple-600';
      case 'excited': return 'from-pink-400 to-red-500';
      case 'calm': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getMoodColor(currentMood)} p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Sparkles className="w-6 h-6 mr-2" />
          Mood-Based Content Generator
        </h2>
        <p className="opacity-90">
          Creating personalized content for your {currentMood} mood
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(['art', 'music', 'story', 'image'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
              activeTab === tab
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {getTabIcon(tab)}
            <span className="font-medium capitalize">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => generateContent(activeTab)}
          disabled={isGenerating}
          className={`w-full bg-gradient-to-r ${getMoodColor(currentMood)} text-white font-semibold py-3 px-6 rounded-xl mb-6 transition-all duration-200 disabled:opacity-50`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating {activeTab}...</span>
            </div>
          ) : (
            <span>Generate {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
          )}
        </motion.button>

        {/* Generated Content */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {generatedContent
              .filter(item => item.type === activeTab)
              .map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Share className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">
                    {item.content}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="capitalize">Mood: {item.mood}</span>
                      <span>{item.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
          
          {generatedContent.filter(item => item.type === activeTab).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">{getTabIcon(activeTab)}</div>
              <p>No {activeTab} content generated yet.</p>
              <p className="text-sm">Click the generate button to create personalized content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
