import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Bot } from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { authAPI } from '../lib/api';
import Footer from '../components/Footer';
import TypewriterEffect from '../components/TypewriterEffect';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authAPI.login(formData);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    navigate('/dashboard');
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
    ) {
      setError((err as { response: { data: { message: string } } }).response.data.message);
    } else {
      setError('Login failed');
    }
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <InteractiveBackground />

      <GlassCard className="w-full max-w-md p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Bot className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            <TypewriterEffect
              texts={["Welcome Back", "Ready to Automate?", "Let's Get Started", "Sign In Now"]}
              speed={100}
              deleteSpeed={50}
              pauseTime={2500}
              randomSpeed={true}
              glitchEffect={false}
              cursorChar="▋"
            />
          </h1>
          <p className="text-gray-300">
            <TypewriterEffect
              texts={[
                "Sign in to your NutterXMD account",
                "Access your WhatsApp automation dashboard",
                "Manage your bot features and settings",
                "Continue your automation journey"
              ]}
              speed={60}
              deleteSpeed={30}
              pauseTime={3000}
              startDelay={800}
              characterDelay={20}
            />
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
              Create one
            </Link>
          </p>
          <p className="text-gray-400 mt-4">
            <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              ← Back to Home
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/admin" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">
            Admin Panel
          </Link>
        </div>
      </GlassCard>

      <Footer />
    </div>
  );
};

export default Login;
