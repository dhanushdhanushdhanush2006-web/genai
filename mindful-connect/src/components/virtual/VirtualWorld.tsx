'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Heart, Star, Globe, Trophy, Gift, Zap, Shield, Crown, User, Plus, Palette } from 'lucide-react';
import AvatarCreator from '../avatar/AvatarCreator';
import AvatarGallery from '../avatar/AvatarGallery';

interface VirtualUser {
  id: string;
  name: string;
  avatar: string;
  mood: string;
  isOnline: boolean;
  location: { x: number; y: number };
  level: number;
  badges: string[];
  supportGiven: number;
  supportReceived: number;
  isHelper: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  connectionsToday: number;
  supportGiven: number;
  achievements: Achievement[];
}

interface AvatarConfig {
  emoji: string;
  style: string;
  color: string;
  accessory: string;
  background: string;
  name: string;
}

export default function VirtualWorld() {
  const [selectedUser, setSelectedUser] = useState<VirtualUser | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [showAvatarGallery, setShowAvatarGallery] = useState(false);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<AvatarConfig>({
    emoji: '😊',
    style: 'friendly',
    color: '#3B82F6',
    accessory: 'none',
    background: 'gradient1',
    name: 'My Avatar'
  });
  const [userStats, setUserStats] = useState<UserStats>({
    level: 5,
    xp: 1250,
    xpToNext: 1500,
    connectionsToday: 3,
    supportGiven: 12,
    achievements: [
      { id: '1', title: 'First Connection', description: 'Made your first connection', icon: '🤝', unlocked: true, progress: 1, maxProgress: 1 },
      { id: '2', title: 'Supportive Friend', description: 'Helped 10 people', icon: '💝', unlocked: true, progress: 10, maxProgress: 10 },
      { id: '3', title: 'Mood Master', description: 'Shared 50 mood updates', icon: '🎭', unlocked: false, progress: 23, maxProgress: 50 },
      { id: '4', title: 'Community Builder', description: 'Connected 100 people', icon: '🏗️', unlocked: false, progress: 45, maxProgress: 100 },
    ]
  });
  const [users] = useState<VirtualUser[]>([
    {
      id: '1',
      name: 'Alex',
      avatar: '🌟',
      mood: 'peaceful',
      isOnline: true,
      location: { x: 20, y: 30 },
      level: 8,
      badges: ['🏆', '💝'],
      supportGiven: 25,
      supportReceived: 18,
      isHelper: true
    },
    {
      id: '2',
      name: 'Sam',
      avatar: '🌸',
      mood: 'hopeful',
      isOnline: true,
      location: { x: 60, y: 45 },
      level: 3,
      badges: ['🤝'],
      supportGiven: 8,
      supportReceived: 12,
      isHelper: false
    },
    {
      id: '3',
      name: 'Jordan',
      avatar: '🌈',
      mood: 'calm',
      isOnline: true,
      location: { x: 40, y: 70 },
      level: 12,
      badges: ['👑', '🏆', '💝', '🎭'],
      supportGiven: 50,
      supportReceived: 30,
      isHelper: true
    },
    {
      id: '4',
      name: 'Riley',
      avatar: '🦋',
      mood: 'grateful',
      isOnline: false,
      location: { x: 75, y: 25 },
      level: 6,
      badges: ['💝', '🤝'],
      supportGiven: 15,
      supportReceived: 20,
      isHelper: false
    }
  ]);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'peaceful': return 'bg-blue-400';
      case 'hopeful': return 'bg-green-400';
      case 'calm': return 'bg-purple-400';
      case 'grateful': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Virtual landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-16 h-20 bg-green-700/40 rounded-t-full" />
        <div className="absolute bottom-0 right-1/3 w-12 h-16 bg-green-600/40 rounded-t-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              Mindful Space
            </h1>
            <p className="text-white/80 text-sm">Connect with others on their wellness journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span className="text-sm">Level {userStats.level}</span>
            </button>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">{userStats.achievements.filter(a => a.unlocked).length}</span>
            </button>
            <button
              onClick={() => setShowAvatarGallery(true)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Avatars</span>
            </button>
            <button
              onClick={() => setShowAvatarCreator(true)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Create</span>
            </button>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">{users.filter(u => u.isOnline).length} online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20 mx-6 mb-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-white"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Your Progress
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.level}</div>
                <div className="text-sm opacity-80">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.xp}</div>
                <div className="text-sm opacity-80">XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.connectionsToday}</div>
                <div className="text-sm opacity-80">Connections Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.supportGiven}</div>
                <div className="text-sm opacity-80">Support Given</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>{userStats.xp}/{userStats.xpToNext} XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Panel */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20 mx-6 mb-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-white"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-white/20 border-yellow-400/50'
                      : 'bg-white/5 border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-400' : 'text-white/60'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm opacity-80">{achievement.description}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full transition-all duration-500 ${
                              achievement.unlocked ? 'bg-yellow-400' : 'bg-white/40'
                            }`}
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual World Area */}
      <div className="relative flex-1 mx-6 mb-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0">
          {/* Users in the virtual space */}
          {users.map((user) => (
            <motion.div
              key={user.id}
              className="absolute cursor-pointer"
              style={{
                left: `${user.location.x}%`,
                top: `${user.location.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedUser(user)}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            >
              <div className="relative">
                {/* User avatar */}
                <div className={`w-16 h-16 rounded-full ${getMoodColor(user.mood)} flex items-center justify-center text-2xl shadow-lg border-2 ${
                  user.isHelper ? 'border-yellow-400' : 'border-white/30'
                }`}>
                  {user.avatar}
                </div>

                {/* Online indicator */}
                {user.isOnline && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                )}

                {/* Helper badge */}
                {user.isHelper && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Shield className="w-3 h-3 text-yellow-800" />
                  </div>
                )}

                {/* Level indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {user.level}
                </div>

                {/* Name label */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {user.name}
                </div>

                {/* Badges */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center space-x-1">
                  {user.badges.slice(0, 3).map((badge, index) => (
                    <span key={index} className="text-xs">{badge}</span>
                  ))}
                </div>

                {/* Mood indicator */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 text-xs capitalize">
                  {user.mood}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current User Avatar */}
        <motion.div
          className="absolute bottom-8 left-8 pointer-events-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
              currentUserAvatar.background === 'gradient1' ? 'from-orange-400 via-red-500 to-pink-500' :
              currentUserAvatar.background === 'gradient2' ? 'from-blue-400 via-blue-500 to-blue-600' :
              currentUserAvatar.background === 'gradient3' ? 'from-green-400 via-green-500 to-green-600' :
              currentUserAvatar.background === 'gradient4' ? 'from-purple-400 via-pink-500 to-red-500' :
              currentUserAvatar.background === 'gradient5' ? 'from-yellow-400 via-orange-500 to-red-500' :
              'from-indigo-400 via-purple-500 to-pink-500'
            } p-1 shadow-2xl border-4 border-yellow-400`}>
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${
                currentUserAvatar.style === 'friendly' ? 'from-blue-400 to-blue-600' :
                currentUserAvatar.style === 'energetic' ? 'from-orange-400 to-red-500' :
                currentUserAvatar.style === 'calm' ? 'from-green-400 to-green-600' :
                currentUserAvatar.style === 'wise' ? 'from-purple-400 to-purple-600' :
                currentUserAvatar.style === 'playful' ? 'from-pink-400 to-pink-600' :
                'from-gray-600 to-gray-800'
              } flex items-center justify-center text-3xl relative`}>
                {currentUserAvatar.emoji}
                {currentUserAvatar.accessory !== 'none' && (
                  <div className="absolute -top-1 -right-1 text-lg">
                    {currentUserAvatar.accessory === 'crown' ? '👑' :
                     currentUserAvatar.accessory === 'glasses' ? '👓' :
                     currentUserAvatar.accessory === 'hat' ? '🎩' :
                     currentUserAvatar.accessory === 'flower' ? '🌸' :
                     currentUserAvatar.accessory === 'star' ? '⭐' :
                     currentUserAvatar.accessory === 'heart' ? '💖' :
                     currentUserAvatar.accessory === 'sparkle' ? '✨' : ''}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap">
              You (Level {userStats.level})
            </div>
          </div>
        </motion.div>

        {/* Center message */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white/60">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Welcome to the Mindful Space</p>
            <p className="text-sm">Click on avatars to connect with others</p>
            <p className="text-xs mt-2 opacity-75">Your avatar appears in the bottom left</p>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full ${getMoodColor(selectedUser.mood)} flex items-center justify-center text-3xl mx-auto mb-4 border-2 ${
                selectedUser.isHelper ? 'border-yellow-400' : 'border-gray-200'
              } relative`}>
                {selectedUser.avatar}
                {selectedUser.isHelper && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Crown className="w-4 h-4 text-yellow-800" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center justify-center">
                {selectedUser.name}
                {selectedUser.isHelper && (
                  <span className="ml-2 text-yellow-600 text-sm font-medium">Helper</span>
                )}
              </h3>
              <div className="text-lg font-bold text-blue-600 mb-2">Level {selectedUser.level}</div>
              <p className="text-gray-600 mb-2 capitalize">Feeling {selectedUser.mood}</p>

              {/* Badges */}
              <div className="flex justify-center space-x-1 mb-4">
                {selectedUser.badges.map((badge, index) => (
                  <span key={index} className="text-lg">{badge}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="bg-green-50 rounded-lg p-2">
                  <div className="font-bold text-green-600">{selectedUser.supportGiven}</div>
                  <div className="text-gray-600">Support Given</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2">
                  <div className="font-bold text-purple-600">{selectedUser.supportReceived}</div>
                  <div className="text-gray-600">Support Received</div>
                </div>
              </div>

              {selectedUser.isOnline ? (
                <div className="space-y-3">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Start Conversation</span>
                  </button>
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Send Support (+10 XP)</span>
                  </button>
                  {selectedUser.isHelper && (
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                      <Shield className="w-4 h-4" />
                      <span>Request Professional Help</span>
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">This user is currently offline</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Mindfulness Level: Peaceful</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAvatarGallery(true)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Choose Avatar</span>
            </button>
            <button
              onClick={() => setShowAvatarCreator(true)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Palette className="w-4 h-4" />
              <span>Create Avatar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Creator Modal */}
      <AvatarCreator
        isOpen={showAvatarCreator}
        onClose={() => setShowAvatarCreator(false)}
        onSave={(avatar) => {
          setCurrentUserAvatar(avatar);
          // Here you could also update the user's avatar in the database
          console.log('Avatar saved:', avatar);
        }}
        currentAvatar={currentUserAvatar}
      />

      {/* Avatar Gallery Modal */}
      <AvatarGallery
        isOpen={showAvatarGallery}
        onClose={() => setShowAvatarGallery(false)}
        onSelect={(avatar) => {
          setCurrentUserAvatar(avatar);
          // Here you could also update the user's avatar in the database
          console.log('Avatar selected:', avatar);
        }}
      />
    </div>
  );
}
