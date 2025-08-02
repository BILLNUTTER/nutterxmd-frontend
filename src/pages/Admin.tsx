import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Users, CreditCard, CheckCircle, X, 
   Smartphone, Settings, Eye, 
  Send, Link, Bot, Sparkles 
} from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import TypewriterEffect from '../components/TypewriterEffect';

interface Payment {
  _id: string;
  userId: string;
  sessionId: string;
  mpesaCode: string;
  amount: number;
  isVerified: boolean;
  createdAt: string;
  user: {
    username: string;
    email: string;
    phone: string;
  };
}

interface Session {
  _id: string;
  userId: string;
  sessionId: string;
  whatsappNumber: string;
  isActive: boolean;
  expiryDate: string;
  user: {
    username: string;
    email: string;
    phone: string;
  };
}

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  isActive: boolean;
  sessionId?: string;
  expiryDate?: string;
  createdAt: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'payments' | 'sessions' | 'users'>('payments');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  
const handleAdminLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminKey }), // ✅ Required
    });

    if (response.ok) {
      setIsAuthenticated(true);
      await loadData();
    } else {
      alert('Invalid admin key');
    }
  } catch (err) {
    alert('Error connecting to server');
    console.error(err);
  }
};

const loadData = async () => {
  setLoading(true);
  try {
    const paymentsResponse = await fetch('/api/admin/payments/pending', {
      headers: { 'admin-key': adminKey }
    });
    if (paymentsResponse.ok) {
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData);
    }

    const sessionsResponse = await fetch('/api/admin/sessions/active', {
      headers: { 'admin-key': adminKey }
    });
    if (sessionsResponse.ok) {
      const sessionsData = await sessionsResponse.json();
      setSessions(sessionsData);
    }

    const usersResponse = await fetch('/api/admin/users', {
      headers: { 'admin-key': adminKey }
    });
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      setUsers(usersData);
    }
  } catch (error) {
    console.error('Failed to load admin data:', error);
  } finally {
    setLoading(false);
  }
};

const verifyPayment = async (paymentId: string) => {
  try {
    const response = await fetch('/api/admin/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminKey
      },
      body: JSON.stringify({ paymentId, adminId: 'admin' })
    });

    if (response.ok) {
      alert('Payment verified and bot activated!');
      await loadData();
    } else {
      alert('Failed to verify payment');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    alert('Failed to verify payment');
  }
};

const sendMessage = async () => {
  if (!selectedUser || !message.trim()) return;

  try {
    const response = await fetch('/api/admin/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminKey
      },
      body: JSON.stringify({ userId: selectedUser._id, message })
    });

    if (response.ok) {
      alert('Message sent successfully!');
      setMessage('');
      setShowMessageModal(false);
      setSelectedUser(null);
    } else {
      alert('Failed to send message');
    }
  } catch (error) {
    console.error('Send message error:', error);
    alert('Failed to send message');
  }
};

const linkDevice = async () => {
  if (!selectedUser) return;

  try {
    const response = await fetch('/api/admin/link-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminKey
      },
      body: JSON.stringify({ userId: selectedUser._id })
    });

    if (response.ok) {
      alert('Device linking initiated successfully!');
      setShowLinkModal(false);
      setSelectedUser(null);
      await loadData();
    } else {
      alert('Failed to link device');
    }
  } catch (error) {
    console.error('Link device error:', error);
    alert('Failed to link device');
  }
};

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <InteractiveBackground />
        
        <GlassCard className="w-full max-w-md p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <TypewriterEffect
                texts={[
                  "Admin Panel",
                  "Control Center",
                  "Management Hub",
                  "Security Access",
                  "Admin Dashboard"
                ]}
                speed={80}
                deleteSpeed={40}
                pauseTime={2500}
                randomSpeed={true}
                cursorChar="▌"
              />
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h1>
            <p className="text-gray-300">
              <TypewriterEffect
                texts={[
                  "Secure admin access required",
                  "Enter your admin credentials",
                  "Manage users and payments",
                  "Monitor system operations",
                  "Administrative control panel"
                ]}
                speed={60}
                deleteSpeed={30}
                pauseTime={3000}
                startDelay={800}
                characterDelay={20}
              />
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>

            <button
              onClick={handleAdminLogin}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Access Admin Panel
            </button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </GlassCard>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <InteractiveBackground />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <Shield className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                    <TypewriterEffect
                      texts={[
                        "NutterXMD Admin Panel",
                        "System Control Center",
                        "Management Dashboard",
                        "Administrative Hub",
                        "Operations Center"
                      ]}
                      speed={70}
                      deleteSpeed={35}
                      pauseTime={3500}
                      randomSpeed={true}
                      cursorChar="█"
                    />
                    <Bot className="w-6 h-6 text-blue-400" />
                  </h1>
                  <p className="text-gray-300">
                    <TypewriterEffect
                      texts={[
                        "Manage users, payments, and bot operations",
                        "Monitor system performance and user activity",
                        "Verify payments and activate bot services",
                        "Control user access and system settings",
                        "Oversee WhatsApp bot automation platform"
                      ]}
                      speed={50}
                      deleteSpeed={25}
                      pauseTime={4000}
                      startDelay={500}
                      characterDelay={15}
                    />
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setAdminKey('');
                }}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <GlassCard className="p-2">
            <div className="flex space-x-2">
              {[
                { key: 'payments', label: 'Pending Payments', icon: <CreditCard className="w-5 h-5" /> },
                { key: 'sessions', label: 'Active Sessions', icon: <Users className="w-5 h-5" /> },
                { key: 'users', label: 'All Users', icon: <Settings className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.key}
               onClick={() => setActiveTab(tab.key as 'payments' | 'sessions' | 'users')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Pending Payments */}
            {activeTab === 'payments' && (
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  Pending Payments ({payments.length})
                </h2>
                
                {payments.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No pending payments</p>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment._id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{payment.user.username}</h3>
                            <p className="text-gray-300 text-sm">{payment.user.email}</p>
                            <p className="text-gray-300 text-sm">{payment.user.phone}</p>
                            <p className="text-blue-400 text-sm">Amount: KSh {payment.amount}</p>
                            <p className="text-purple-400 text-sm">M-Pesa Code: {payment.mpesaCode}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(payment.createdAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => verifyPayment(payment._id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Verify & Activate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            )}

            {/* Active Sessions */}
            {activeTab === 'sessions' && (
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  Active Sessions ({sessions.length})
                </h2>
                
                {sessions.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No active sessions</p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session._id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{session.user.username}</h3>
                            <p className="text-gray-300 text-sm">{session.user.email}</p>
                            <p className="text-gray-300 text-sm">{session.user.phone}</p>
                            <p className="text-green-400 text-sm">WhatsApp: {session.whatsappNumber}</p>
                            <p className="text-blue-400 text-sm">Session: {session.sessionId.slice(0, 8)}...</p>
                            <p className="text-gray-400 text-xs">
                              Expires: {new Date(session.expiryDate).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            )}

            {/* All Users */}
            {activeTab === 'users' && (
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-400" />
                  All Users ({users.length})
                </h2>
                
                {users.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No users found</p>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user._id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{user.username}</h3>
                            <p className="text-gray-300 text-sm">{user.email}</p>
                            <p className="text-gray-300 text-sm">{user.phone}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className={`text-sm ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              {user.sessionId && (
                                <span className="text-blue-400 text-sm">
                                  Session: {user.sessionId.slice(0, 8)}...
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-xs mt-1">
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowMessageModal(true);
                              }}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors duration-300"
                              title="Send Message"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowLinkModal(true);
                              }}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors duration-300"
                              title="Link Device"
                            >
                              <Link className="w-4 h-4" />
                            </button>
                            
                            <button
                              className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 transition-colors duration-300"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            )}
          </>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <GlassCard className="w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Send Message</h3>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedUser(null);
                    setMessage('');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">To: {selectedUser.username}</p>
                  <p className="text-gray-400 text-xs">{selectedUser.phone}</p>
                </div>
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => {
                      setShowMessageModal(false);
                      setSelectedUser(null);
                      setMessage('');
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Link Device Modal */}
        {showLinkModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <GlassCard className="w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Link Device</h3>
                <button
                  onClick={() => {
                    setShowLinkModal(false);
                    setSelectedUser(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">User: {selectedUser.username}</p>
                  <p className="text-gray-400 text-xs">{selectedUser.phone}</p>
                </div>
                
                <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    This will initiate device linking for the user. They will receive instructions to link their WhatsApp.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={linkDevice}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    Link Device
                  </button>
                  <button
                    onClick={() => {
                      setShowLinkModal(false);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;