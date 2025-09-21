'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Users, Palette, Shield, ArrowLeft, RefreshCw, ExternalLink, MoreHorizontal } from 'lucide-react';
import DemoChatInterface from '@/components/demo/DemoChatInterface';
import VirtualWorld from '@/components/virtual/VirtualWorld';
import MultimediaGenerator from '@/components/multimedia/MultimediaGenerator';
import EmergencyPanel from '@/components/emergency/EmergencyPanel';

export default function LandingPage() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'world' | 'multimedia' | 'emergency'>('landing');
  const [showMultimediaGenerator, setShowMultimediaGenerator] = useState(false);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);

  // Handle feature navigation
  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'ai-companion':
        setCurrentView('chat');
        break;
      case 'virtual-community':
        setCurrentView('world');
        break;
      case 'mood-creation':
        setShowMultimediaGenerator(true);
        break;
      case 'emergency-support':
        setShowEmergencyPanel(true);
        break;
      default:
        setCurrentView('landing');
    }
  };

  // Render different views
  if (currentView === 'chat') {
    return (
      <div className="h-screen flex flex-col">
        {/* Demo Header */}
        <div className="bg-blue-100 border-b border-blue-200 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <span>🎯 Demo Mode - AI Companion</span>
              <button
                onClick={() => setCurrentView('landing')}
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
        <DemoChatInterface />
      </div>
    );
  }

  if (currentView === 'world') {
    return (
      <div className="h-screen flex flex-col">
        {/* Demo Header */}
        <div className="bg-blue-100 border-b border-blue-200 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <span>🌍 Demo Mode - Virtual Community</span>
              <button
                onClick={() => setCurrentView('landing')}
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
        <VirtualWorld />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Browser-like Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Browser Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* URL Bar */}
            <div className="flex-1 max-w-md bg-gray-100 rounded-full px-4 py-1 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">mindfulconnect.ai</span>
            </div>
          </div>
          
          {/* Browser Menu */}
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blue Banner */}
      <div className="bg-blue-100 border-b border-blue-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <span>🌍 Ready to share with the world?</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors">
              📢 Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">MindfulConnect</h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Your emotional companion powered by AI
          </p>

          <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 mb-8 inline-block">
            <span className="text-yellow-800 text-sm font-medium">🎯 Demo Mode - Click any feature below to try it!</span>
          </div>

          <button
            onClick={() => handleFeatureClick('ai-companion')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Try AI Companion
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* AI Companion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => handleFeatureClick('ai-companion')}
          >
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <MessageCircle className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Companion</h3>
            <p className="text-gray-600 leading-relaxed">
              Chat with Aura, your multilingual AI companion that understands your emotions
            </p>
          </motion.div>

          {/* Virtual Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => handleFeatureClick('virtual-community')}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Virtual Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with others who understand your feelings in safe, anonymous spaces
            </p>
          </motion.div>

          {/* Mood-Based Creation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => handleFeatureClick('mood-creation')}
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <Palette className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mood-Based Creation</h3>
            <p className="text-gray-600 leading-relaxed">
              Generate personalized art, music, and stories based on your emotional state
            </p>
          </motion.div>

          {/* Emergency Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => handleFeatureClick('emergency-support')}
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Quick access to help and emergency contacts when you need them most
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-12 text-center text-white shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to feel understood?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands who have found comfort and connection through MindfulConnect
          </p>
          <button
            onClick={() => handleFeatureClick('ai-companion')}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Try Demo Now
          </button>
        </motion.div>

        {/* Features List */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span>18+ Indian Languages</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-blue-600 font-bold">🎥</span>
              </div>
              <span>3D Video Calls</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-purple-600 font-bold">🎨</span>
              </div>
              <span>AI Art Generation</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-red-600 font-bold">🚨</span>
              </div>
              <span>24/7 Crisis Support</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">MindfulConnect</span>
          </div>
          <p className="text-gray-600 text-sm">
            Empowering mental wellness through AI technology • Made with ❤️ for India
          </p>
        </div>
      </footer>

      {/* Multimedia Generator Modal */}
      <MultimediaGenerator
        isOpen={showMultimediaGenerator}
        onClose={() => setShowMultimediaGenerator(false)}
        currentMood="happy"
        language="en"
      />

      {/* Emergency Panel Modal */}
      <EmergencyPanel
        isOpen={showEmergencyPanel}
        onClose={() => setShowEmergencyPanel(false)}
      />
    </div>
  );
}
