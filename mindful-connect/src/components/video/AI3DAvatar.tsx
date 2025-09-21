'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface AI3DAvatarProps {
  isListening: boolean;
  isSpeaking: boolean;
  emotion: string;
  personality: string;
  language: string;
}

// 3D Avatar Head Component
function AvatarHead({ isListening, isSpeaking, emotion, personality }: {
  isListening: boolean;
  isSpeaking: boolean;
  emotion: string;
  personality: string;
}) {
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (headRef.current) {
      // Gentle head movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    // Eye blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blinkTime = Math.sin(state.clock.elapsedTime * 3) > 0.95 ? 0.1 : 1;
      leftEyeRef.current.scale.y = blinkTime;
      rightEyeRef.current.scale.y = blinkTime;
    }

    // Mouth animation for speaking
    if (mouthRef.current && isSpeaking) {
      const speakScale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.3;
      mouthRef.current.scale.x = speakScale;
      mouthRef.current.scale.y = speakScale;
    }
  });

  const getPersonalityColor = () => {
    switch (personality) {
      case 'energetic': return '#FF6B35';
      case 'calm': return '#4ECDC4';
      case 'wise': return '#9B59B6';
      default: return '#3498DB';
    }
  };

  const getEmotionExpression = () => {
    switch (emotion) {
      case 'happy': return { eyeY: 0.1, mouthY: -0.1, mouthScale: 1.2 };
      case 'sad': return { eyeY: -0.05, mouthY: 0.1, mouthScale: 0.8 };
      case 'excited': return { eyeY: 0.15, mouthY: -0.15, mouthScale: 1.4 };
      case 'calm': return { eyeY: 0.05, mouthY: -0.05, mouthScale: 1.0 };
      default: return { eyeY: 0, mouthY: 0, mouthScale: 1.0 };
    }
  };

  const expression = getEmotionExpression();

  return (
    <group ref={headRef}>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color={getPersonalityColor()} />
      </Sphere>

      {/* Eyes */}
      <Sphere 
        ref={leftEyeRef}
        args={[0.15, 16, 16]} 
        position={[-0.3, expression.eyeY, 0.7]}
      >
        <meshStandardMaterial color="#2C3E50" />
      </Sphere>
      <Sphere 
        ref={rightEyeRef}
        args={[0.15, 16, 16]} 
        position={[0.3, expression.eyeY, 0.7]}
      >
        <meshStandardMaterial color="#2C3E50" />
      </Sphere>

      {/* Mouth */}
      <Cylinder
        ref={mouthRef}
        args={[0.2 * expression.mouthScale, 0.2 * expression.mouthScale, 0.1, 16]}
        position={[0, expression.mouthY - 0.3, 0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#E74C3C" />
      </Cylinder>

      {/* Listening indicator */}
      {isListening && (
        <group>
          <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#00FF00" 
              transparent 
              opacity={0.2}
              wireframe
            />
          </Sphere>
        </group>
      )}

      {/* Speaking indicator */}
      {isSpeaking && (
        <group>
          {[1.3, 1.5, 1.7].map((radius, index) => (
            <Sphere key={index} args={[radius, 32, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#FFD700" 
                transparent 
                opacity={0.1 - index * 0.03}
                wireframe
              />
            </Sphere>
          ))}
        </group>
      )}
    </group>
  );
}

// Floating particles for ambiance
function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02, 8, 8]}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <meshStandardMaterial color="#FFD700" transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  );
}

// Language indicator
function LanguageIndicator({ language }: { language: string }) {
  const languageNames: Record<string, string> = {
    en: 'EN',
    hi: 'हि',
    bn: 'বা',
    te: 'తె',
    mr: 'म',
    ta: 'த',
    gu: 'ગ',
    kn: 'ಕ',
    ml: 'മ',
    pa: 'ਪ',
    or: 'ଓ',
    as: 'অ',
    ur: 'ا',
    sa: 'स',
    ne: 'ने',
    si: 'සි'
  };

  return (
    <Text
      position={[0, -2, 0]}
      fontSize={0.3}
      color="#FFFFFF"
      anchorX="center"
      anchorY="middle"
    >
      {languageNames[language] || 'EN'}
    </Text>
  );
}

export default function AI3DAvatar({ 
  isListening, 
  isSpeaking, 
  emotion, 
  personality, 
  language 
}: AI3DAvatarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading 3D Avatar...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />

        {/* 3D Avatar */}
        <AvatarHead
          isListening={isListening}
          isSpeaking={isSpeaking}
          emotion={emotion}
          personality={personality}
        />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Language indicator */}
        <LanguageIndicator language={language} />

        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Status indicators */}
      <div className="absolute top-4 left-4 space-y-2">
        {isListening && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Listening...</span>
          </motion.div>
        )}
        
        {isSpeaking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <span>Speaking...</span>
          </motion.div>
        )}
      </div>

      {/* Emotion indicator */}
      <div className="absolute top-4 right-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/50 text-white px-3 py-1 rounded-full text-sm capitalize"
        >
          Feeling: {emotion}
        </motion.div>
      </div>

      {/* Personality indicator */}
      <div className="absolute bottom-4 left-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/50 text-white px-3 py-1 rounded-full text-sm capitalize"
        >
          {personality} AI
        </motion.div>
      </div>
    </div>
  );
}
