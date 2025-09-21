'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, Users, Heart, X } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyPanel({ isOpen, onClose }: EmergencyPanelProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    // Indian Emergency Numbers
    { id: '1', name: 'National Emergency', phone: '112', relationship: 'All Emergency Services' },
    { id: '2', name: 'Police', phone: '100', relationship: 'Police Emergency' },
    { id: '3', name: 'Fire Brigade', phone: '101', relationship: 'Fire Emergency' },
    { id: '4', name: 'Ambulance', phone: '108', relationship: 'Medical Emergency' },
    { id: '5', name: 'KIRAN Mental Health', phone: '1800-599-0019', relationship: 'Mental Health Support' },
    { id: '6', name: 'Vandrevala Foundation', phone: '9999666555', relationship: 'Crisis Intervention' },
    { id: '7', name: 'AASRA Helpline', phone: '91-9820466726', relationship: 'Suicide Prevention' },
    { id: '8', name: 'Sneha Foundation', phone: '044-24640050', relationship: 'Emotional Support' },
    { id: '9', name: 'iCall TISS', phone: '9152987821', relationship: 'Psychosocial Support' },
    { id: '10', name: 'Sahai Bangalore', phone: '080-25497777', relationship: 'Emotional Support' },
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, {
        id: Date.now().toString(),
        ...newContact
      }]);
      setNewContact({ name: '', phone: '', relationship: '' });
      setShowAddContact(false);
    }
  };

  const handleEmergencyAlert = () => {
    // In a real app, this would send alerts to emergency contacts
    alert('Emergency alert sent to your contacts and nearby users who opted in to help!');
  };

  const handleCallContact = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                Emergency Support
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Emergency Alert Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmergencyAlert}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl mb-6 flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="w-6 h-6" />
              <span>Send Emergency Alert</span>
            </motion.button>

            {/* Quick Help Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mb-6 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Request Help from Nearby Users</span>
            </motion.button>

            {/* Emergency Contacts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Emergency Contacts</h3>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Add Contact
                </button>
              </div>

              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  <button
                    onClick={() => handleCallContact(contact.phone)}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Add Contact Form */}
            <AnimatePresence>
              {showAddContact && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 space-y-4 border-t pt-4"
                >
                  <h4 className="font-semibold text-gray-800">Add Emergency Contact</h4>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddContact}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Add Contact
                    </button>
                    <button
                      onClick={() => setShowAddContact(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Support Resources */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Remember
              </h4>
              <p className="text-sm text-blue-700">
                You are not alone. There are people who care about you and want to help. 
                If you're having thoughts of self-harm, please reach out immediately.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
