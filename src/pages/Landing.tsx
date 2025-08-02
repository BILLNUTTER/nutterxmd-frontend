import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot, MessageCircle, Users, Clock, Command,
  QrCode, Phone, Zap, Shield, Sparkles, ArrowRight,
  CheckCircle, Globe, Settings, TrendingUp,
  Mail, MapPin, ExternalLink
} from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import GlassCard from '../components/GlassCard';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';
import TypewriterEffect from '../components/TypewriterEffect';
import AnimatedCounter from '../components/AnimatedCounter';

const Landing: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  // ✅ Fixed: useState returns [value, setter]
  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    uptime: 0,
    satisfaction: 0,
  });

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Auto Reply System",
      description: "Intelligent automated responses with customizable templates and smart keyword detection"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Management",
      description: "Welcome new members, moderate content, and manage group activities seamlessly"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Scheduled Messages",
      description: "Send messages at perfect timing with advanced scheduling and timezone support"
    },
    {
      icon: <Command className="w-8 h-8" />,
      title: "Custom Commands",
      description: "Create powerful custom commands with variables, conditions, and actions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Privacy",
      description: "End-to-end encryption with secure session management and data protection"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Ultra-fast response times with optimized performance and minimal latency"
    }
  ];

  const testimonials = [
    "🚀 Revolutionary WhatsApp automation platform",
    "⚡ Lightning-fast bot responses and management",
    "🎯 Perfect for business and personal use",
    "💎 Premium features at affordable prices",
    "🔒 Secure and reliable 24/7 operation",
    "🌟 Trusted by thousands of users worldwide"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const targets = {
      users: 2547,
      messages: 1250000,
      uptime: 99.9,
      satisfaction: 98,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    let intervalId: NodeJS.Timeout | null = null;

    const animateStats = () => {
      intervalId = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);

        setStats({
          users: Math.floor(targets.users * progress),
          messages: Math.floor(targets.messages * progress),
          uptime: Math.round(targets.uptime * progress * 10) / 10,
          satisfaction: Math.floor(targets.satisfaction * progress),
        });

        if (step >= steps) {
          clearInterval(intervalId!);
          setStats(targets);
        }
      }, stepDuration);
    };

    const timeoutId = setTimeout(animateStats, 500);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <InteractiveBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NutterXMD</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">

              <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NutterXMD  .  WhatsApp Bot  .  AI Assistant
              </span>

              <br />
              <TypewriterEffect
                texts={[
                  "WhatsApp Bot Revolution",
                  "AI-Powered Automation",
                  "Smart Message Management",
                  "Enterprise-Grade Features",
                  "Future of Messaging"
                ]}
                className="text-3xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                speed={120}
                deleteSpeed={60}
                pauseTime={3000}
                randomSpeed={true}
                characterDelay={50}
              />
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              <TypewriterEffect
                texts={[
                  "Transform your WhatsApp into a powerful automation platform with AI-driven responses, smart scheduling, and enterprise-grade features. Built for the future of messaging.",
                  "Automate customer support, schedule messages, manage groups, and create custom commands with our advanced WhatsApp bot platform.",
                  "Join thousands of users who trust NutterXMD for their WhatsApp automation needs. Professional, reliable, and feature-rich.",
                  "Experience the next generation of WhatsApp automation with cutting-edge AI technology and seamless integration."
                ]}
                speed={40}
                deleteSpeed={20}
                pauseTime={4000}
                startDelay={1000}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/254713881613"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> Live Demo
            </a>
          </div>

          {/* Animated Feature Showcase */}
          <GlassCard className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="text-blue-400 mr-4">
                {features[currentFeature].icon}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-300">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentFeature ? 'bg-blue-400 w-8' : 'bg-gray-600'
                    }`}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-white/10">
        <Marquee speed="normal" className="text-white/80 text-lg">
          <div className="flex items-center space-x-12">
            {testimonials.map((text, index) => (
              <span key={index} className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

            <GlassCard
              className="p-6 text-center transform hover:scale-105 transition-all duration-300"
              aria-label="Active Users"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter
                  target={2547}
                  suffix="+"
                  duration={2500}
                  easing="easeOut"
                  className="text-blue-400"
                />
              </div>
              <div className="text-sm text-gray-300">Active Users</div>
            </GlassCard>

            <GlassCard
              className="p-6 text-center transform hover:scale-105 transition-all duration-300"
              aria-label="Messages Sent"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                <AnimatedCounter
                  target={1250000}
                  suffix="+"
                  duration={3000}
                  easing="easeOut"
                  className="text-green-400"
                  startDelay={500}
                />
              </div>
              <div className="text-sm text-gray-300">Messages Sent</div>
            </GlassCard>

            <GlassCard
              className="p-6 text-center transform hover:scale-105 transition-all duration-300"
              aria-label="Uptime"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                <AnimatedCounter
                  target={99.9}
                  suffix="%"
                  duration={2000}
                  easing="easeInOut"
                  className="text-purple-400"
                  startDelay={1000}
                />
              </div>
              <div className="text-sm text-gray-300">Uptime</div>
            </GlassCard>

            <GlassCard
              className="p-6 text-center transform hover:scale-105 transition-all duration-300"
              aria-label="User Satisfaction"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter
                  target={98}
                  suffix="%"
                  duration={2200}
                  easing="easeOut"
                  className="text-yellow-400"
                  startDelay={1500}
                />
              </div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to automate and enhance your WhatsApp experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Smart Auto Reply",
                description: "AI-powered responses that understand context and provide relevant answers to your contacts."
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Message Scheduling",
                description: "Schedule messages for perfect timing across different time zones with advanced calendar integration."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Group Management",
                description: "Automate group activities, welcome messages, and member management with intelligent moderation."
              },
              {
                icon: <Command className="w-8 h-8" />,
                title: "Custom Commands",
                description: "Create powerful custom commands with variables, conditions, and automated workflows."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enterprise Security",
                description: "Bank-level encryption, secure sessions, and compliance with international data protection standards."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Analytics Dashboard",
                description: "Comprehensive insights into message performance, user engagement, and automation effectiveness."
              }
            ].map((feature, index) => (
              <GlassCard key={index} className="p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes with our simple 4-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: <Globe className="w-8 h-8" />,
                title: "Create Account",
                description: "Sign up with your email and create your secure NutterXMD account in seconds."
              },
              {
                step: "02",
                icon: <QrCode className="w-8 h-8" />,
                title: "Link WhatsApp",
                description: "Connect your WhatsApp using QR code or phone verification for instant setup."
              },
              {
                step: "03",
                icon: <Settings className="w-8 h-8" />,
                title: "Configure Features",
                description: "Customize your bot settings, enable features, and set up automated responses."
              },
              {
                step: "04",
                icon: <Zap className="w-8 h-8" />,
                title: "Go Live",
                description: "Activate your bot and start automating your WhatsApp conversations instantly."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <GlassCard className="p-8 text-center h-full transform hover:scale-105 transition-all duration-300">
                  <div className="text-6xl font-bold text-blue-400/20 mb-4">{step.step}</div>
                  <div className="text-blue-400 mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </GlassCard>

                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-400/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Affordable plans designed for everyone, from individuals to enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                KSh 500<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Basic auto-reply",
                  "Up to 1,000 messages",
                  "Email support",
                  "Basic analytics"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block"
              >
                Get Started
              </Link>
            </GlassCard>

            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                KSh 1,500<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Advanced AI responses",
                  "Unlimited messages",
                  "Group management",
                  "Custom commands",
                  "Priority support",
                  "Advanced analytics"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block"
              >
                Get Started
              </Link>
            </GlassCard>

            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                Custom<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Professional",
                  "Multi-account management",
                  "API access",
                  "Custom integrations",
                  "24/7 phone support",
                  "Dedicated account manager"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/254713881613"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 inline-block"
              >
                Contact Sales
              </a>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your WhatsApp experience? Contact us today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300">
              <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-300 mb-4">Get instant support</p>
              <a
                href="https://wa.me/254713881613"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
              >
                +254 713 881 613 <ExternalLink className="w-4 h-4" />
              </a>
            </GlassCard>

            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300">
              <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-300 mb-4">Business inquiries</p>
              <a
                href="mailto:support@nutterxmd.com"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                omayiocalvin59@gmail.com
                +254758891491
              </a>
            </GlassCard>

            <GlassCard className="p-8 text-center transform hover:scale-105 transition-all duration-300">
              <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-gray-300 mb-4">Based in Kenya</p>
              <p className="text-purple-400">Nairobi, Kenya</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;