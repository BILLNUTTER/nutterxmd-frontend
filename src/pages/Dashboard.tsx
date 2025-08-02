import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageCircle, Users, Link2Off, Trash2, CreditCard, Smile, Heart, Activity, Command, QrCode, Send, LogOut, Settings, Sparkles, Eye, } from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import GlassCard from '../components/GlassCard';
import FeatureToggle from '../components/FeatureToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import { dashboardAPI, whatsappAPI, paymentAPI } from '../lib/api';
import { BotFeatures, ClientUser } from '../../backend/shared/types';
import Footer from '../components/Footer';
import TypewriterEffect from '../components/TypewriterEffect';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ClientUser | null>(null);


  const [features, setFeatures] = useState<BotFeatures>({
    autoReply: false,
    typingDelay: false,
    groupEvents: false,
    groupWelcome: false,
    scheduledMessages: false,
    salute: false,
    referralMessage: false,
    antilink: false,
    paymentReminder: true,
    customCommands: false,
    menuCommand: true,
    blockCommand: false,
    unblockCommand: false,
    presence: 'typing',
    antiDelete: false,
    autobio: false,
    autoread: false,
    autoview: false,
    autolike: false,
  });

  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [linkingMethod, setLinkingMethod] = useState<'qr' | 'phone'>('qr');
  const [generatedPairCode, setGeneratedPairCode] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isGeneratingPair, setIsGeneratingPair] = useState(false);
  const [mpesaCode, setMpesaCode] = useState('');
  const [amount, setAmount] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [prefix, setPrefix] = useState('.');
  const [mode, setMode] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await dashboardAPI.getDashboard();
      setUser(data.user);
      setFeatures(data.settings.features);
      setSessionId(data.user.sessionId || '');
      setPrefix(data.settings.prefix || '.');
      setMode(data.settings.mode || 'PUBLIC');
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = async (featureName: keyof BotFeatures, enabled: boolean) => {
    const updatedFeatures = { ...features, [featureName]: enabled };
    setFeatures(updatedFeatures);
    setHasUnsavedChanges(true);
  };

  const handlePrefixChange = (newPrefix: string) => {
    if (newPrefix.length <= 3) {
      setPrefix(newPrefix);
      setHasUnsavedChanges(true);
    }
  };

  const handleModeChange = (newMode: 'PUBLIC' | 'PRIVATE') => {
    setMode(newMode);
    setHasUnsavedChanges(true);
  };

  const saveAllChanges = async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    try {
      // Save features
      await dashboardAPI.updateFeatures(features);

      // Save settings (prefix and mode)
      await dashboardAPI.updateSettings({ prefix, mode });

      setHasUnsavedChanges(false);
      alert('All changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const generateQR = async (): Promise<void> => {
    if (isGeneratingQR || !user) return;

    try {
      setIsGeneratingQR(true);

      // ✅ Force backend to create a new QR/session
      const data = await whatsappAPI.createOrRestoreSession(user.id, true); // Pass forceNew = true

      if (data.qr) {
        setQrCode(data.qr); // Always expect a QR to be returned
      } else {
        throw new Error('Expected a QR code, but none was received.');
      }
    } catch (error) {
      console.error('❌ Failed to generate new QR session:', error);
      alert('Failed to initialize a new WhatsApp session. Please try again.');
    } finally {
      setIsGeneratingQR(false);
    }
  };


  const generatePairCode = async () => {
    if (!whatsappNumber.trim()) {
      alert('Please enter your WhatsApp number');
      return;
    }

    if (isGeneratingPair) return;

    try {
      setIsGeneratingPair(true);

      const data = await whatsappAPI.generatePairCode(whatsappNumber);
      setGeneratedPairCode(data.pairingCode);

      alert(`${data.message}\n\n📲 Pair Code: ${data.pairingCode}`);

      // Optional: trigger polling or UI state to show "waiting for device to be linked"
    } catch (error) {
      console.error('Failed to generate pair code:', error);
      alert('Failed to generate pair code. Please try again.');
    } finally {
      setIsGeneratingPair(false);
    }
  };


  const sendSessionToDeveloper = async (): Promise<void> => {
    try {
      await whatsappAPI.sendSession(sessionId);
      alert('Session ID sent to developer successfully!');
    } catch (error) {
      console.error('Failed to send session:', error);
      alert('Failed to send session to developer. Please try again.');
    }
  };

  const submitPayment = async () => {
    try {
      await paymentAPI.submitPayment(mpesaCode, parseInt(amount));
      setMpesaCode('');
      setAmount('');
      alert('Payment submitted for verification!');
    } catch (error) {
      console.error('Failed to submit payment:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <InteractiveBackground />
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const featuresList = [
    {
      key: 'autoReply' as keyof BotFeatures,
      label: 'Auto Reply',
      description: 'Automatically respond to incoming messages',
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      key: 'autobio' as keyof BotFeatures,
      label: 'Auto Bio',
      description: 'Automatically update bio with quotes and time',
      icon: <Activity className="w-6 h-6" />
    },
    {
      key: 'groupWelcome' as keyof BotFeatures,
      label: 'Group Welcome',
      description: 'Welcome new members to groups',
      icon: <Users className="w-6 h-6" />
    },
    {
      key: 'antilink' as keyof BotFeatures,
      label: 'Anti-Link',
      description: 'Automatically delete messages containing group invite links',
      icon: <Link2Off className="w-6 h-6" />
    },

    {
      key: 'antiDelete',
      label: 'Anti-Delete',
      description: 'Recover messages that were deleted.',
      icon: <Trash2 className="w-5 h-5 text-red-400" />,
    },
    {
      key: 'autoread' as keyof BotFeatures,
      label: 'Auto Read',
      description: 'Automatically marks incoming messages as read',
      icon: <Eye className="w-6 h-6" />
    },
    {
      key: 'salute' as keyof BotFeatures,
      label: 'Gen Z Jokes',
      description: 'Reply with random Gen Z-style jokes when triggered 🧠😹',
      icon: <Smile className="w-6 h-6" />
    },

    {
      key: 'autoview' as keyof BotFeatures,
      label: 'Auto View Status',
      description: 'Automatically views statuses from others',
      icon: <Eye className="w-6 h-6" />
    },

    {
      key: 'autolike' as keyof BotFeatures,
      label: 'Auto Like Status',
      description: 'Automatically reacts ❤️ to viewed statuses',
      icon: <Heart className="w-6 h-6" />
    }

  ];

  return (
    <div className="min-h-screen p-4">
      <InteractiveBackground />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                    <TypewriterEffect
                      texts={[
                        "NutterXMD Dashboard",
                        "Bot Control Center",
                        "Automation Hub",
                        "Command Center",
                        "Bot Management"
                      ]}
                      speed={80}
                      deleteSpeed={40}
                      pauseTime={3000}
                      randomSpeed={true}
                      cursorChar="▌"
                    />
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </h1>
                  <p className="text-gray-300">
                    <TypewriterEffect
                      texts={[
                        `Welcome back, ${user?.username}`,
                        "Manage your WhatsApp bot",
                        "Configure automation features",
                        "Monitor bot performance",
                        "Control your digital assistant"
                      ]}
                      speed={60}
                      deleteSpeed={30}
                      pauseTime={2500}
                      startDelay={500}
                      characterDelay={25}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${user?.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={`text-sm font-medium ${user?.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {user?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* WhatsApp Linking Section */}
        {!user?.sessionId && (
          <div className="mb-8">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <QrCode className="w-6 h-6 text-green-400" />
                Link WhatsApp
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setLinkingMethod('qr')}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${linkingMethod === 'qr'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                      QR Code
                    </button>
                    <button
                      onClick={() => setLinkingMethod('phone')}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${linkingMethod === 'phone'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                      Phone Code
                    </button>
                  </div>

                  {linkingMethod === 'qr' ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          <strong>QR Code Method:</strong> Click generate to get a QR code, then scan it with your WhatsApp.
                        </p>
                      </div>
                      <button
                        onClick={generateQR}
                        disabled={isGeneratingQR}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingQR ? 'Generating QR Code...' : 'Generate QR Code'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                        <p className="text-purple-300 text-sm">
                          <strong>Pair Code Method:</strong> Enter your WhatsApp number (with country code) to generate a 6-digit code to link your account.
                        </p>
                      </div>

                      <input
                        type="tel"
                        placeholder="WhatsApp Number (e.g., 254712345678)"
                        value={whatsappNumber}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/\D/g, ''); // remove all non-numeric
                          setWhatsappNumber(cleaned);
                        }}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Optional: Show error if number is too short */}
                      {whatsappNumber && whatsappNumber.length !== 12 && (
                        <p className="text-red-400 text-sm">
                          Please enter a valid 12-digit number starting with your country code (e.g., 2547...).
                        </p>
                      )}

                      <button
                        onClick={generatePairCode}
                        disabled={isGeneratingPair || whatsappNumber.length !== 12}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingPair ? 'Generating Pair Code...' : 'Generate Pair Code'}
                      </button>

                      {generatedPairCode && (
                        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <p className="text-green-300 text-sm mb-2">
                            <strong>Your Pair Code:</strong>
                          </p>
                          <div className="text-2xl font-mono text-white text-center bg-black/30 rounded-lg py-3">
                            {generatedPairCode}
                          </div>
                          <p className="text-green-300 text-xs mt-2">
                            Enter this code in your WhatsApp when prompted.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {qrCode && linkingMethod === 'qr' && (
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="p-4 bg-white rounded-lg mb-4">
                        <img src={qrCode} alt="WhatsApp QR Code" className="w-48 h-48" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        Scan this QR code with your WhatsApp
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Session ID Section */}
        {sessionId && (
          <div className="mb-8">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Send className="w-6 h-6 text-purple-400" />
                Session Management
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Your Session ID:</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={sessionId}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(sessionId)}
                      className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors duration-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <button
                  onClick={sendSessionToDeveloper}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Send Session ID to Developer
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Payment Section */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-green-400" />
              Payment Verification
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  <strong>Payment Instructions:</strong> Send payment to M-Pesa number <strong>0758891491</strong>
                  and paste the confirmation message below.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="M-Pesa Confirmation Code"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Amount (KSh)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={submitPayment}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Submit Payment for Verification
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Bot Configuration */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              Bot Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Prefix Configuration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Command Prefix</label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => handlePrefixChange(e.target.value)}
                    maxLength={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter prefix (e.g., ., !, #)"
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    Commands will be: {prefix}menu, {prefix}block, etc.
                  </p>
                </div>
              </div>

              {/* Mode Configuration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Bot Mode</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleModeChange('PUBLIC')}
                      aria-pressed={mode === 'PUBLIC'}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-all duration-300 ${mode === 'PUBLIC'
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                      PUBLIC
                    </button>
                    <button
                      onClick={() => handleModeChange('PRIVATE')}
                      aria-pressed={mode === 'PRIVATE'}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-all duration-300 ${mode === 'PRIVATE'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                      PRIVATE
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {mode === 'PUBLIC'
                      ? 'Anyone can use bot commands'
                      : 'Only you can use bot commands'}
                  </p>
                </div>
              </div>

              {/* Presence Mode Configuration */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <label className="block text-gray-300 mb-2">Presence Mode</label>
                  <select
                    value={features.presence}
                    onChange={(e) => {
                      const newPresence = e.target.value as 'typing' | 'recording' | 'available' | 'off';
                      setFeatures((prev) => ({
                        ...prev,
                        presence: newPresence,
                      }));
                      setHasUnsavedChanges(true); // This enables the save button
                    }}
                    className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="typing">Typing</option>
                    <option value="recording">Recording</option>
                    <option value="available">Online</option>
                    <option value="off">Off</option>
                  </select>
                  <p className="text-gray-400 text-sm mt-1">
                    Choose how the bot appears in chat: typing, recording, online, or hidden.
                  </p>
                </div>
              </div>


            </div>
          </GlassCard>
        </div>


        {/* Bot Features */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Command className="w-6 h-6 text-blue-400" />
              Bot Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuresList
                .filter((feature) => feature.key !== 'presence')
                .map((feature) => (
                  <FeatureToggle
                    key={feature.key}
                    label={feature.label}
                    description={feature.description}
                    enabled={features[feature.key] as boolean}
                    onChange={(enabled) => handleFeatureToggle(feature.key, enabled)}
                    icon={feature.icon}
                  />
                ))}

            </div>
          </GlassCard>
        </div>

        {/* Save Changes Button */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={saveAllChanges}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;