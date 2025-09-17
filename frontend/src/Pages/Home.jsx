import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, DollarSign, Leaf, Users, Activity, Globe, ArrowRight, Play, Star, Shield, Clock } from 'lucide-react';

// Minimal floating particles
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-500 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`
          }}
        />
      ))}
    </div>
  );
};

// Clean Hero Section
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 300);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <FloatingParticles />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div 
        className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center"
        style={{ opacity }}
      >
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-light mb-8 text-gray-900 leading-tight">
            Smart Energy
            <br />
            <span className="font-semibold text-green-500">Management</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Monitor, analyze, and optimize your energy consumption with intelligent insights that save money while protecting our planet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="px-12 py-4 bg-green-500 text-white rounded-full font-medium text-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98">
            <span className="flex items-center gap-2">
              Get Started
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
          
          <button className="px-12 py-4 border-2 border-green-500 text-green-600 rounded-full font-medium text-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 active:scale-98">
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Learn More
            </span>
          </button>
        </div>

        {/* Clean hero stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "30%", label: "Energy Savings" },
            { value: "24/7", label: "Monitoring" },
            { value: "10K+", label: "Users" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-semibold text-green-500 mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Minimal Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Monitor your energy consumption with precision analytics and instant insights into usage patterns."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Optimization", 
      description: "Reduce energy bills with intelligent recommendations and automated efficiency improvements."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Impact",
      description: "Track and minimize your carbon footprint with sustainable energy management practices."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime ensuring your data is always protected."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Compatibility",
      description: "Works with any electrical system worldwide with automatic configuration and setup."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Historical Analysis",
      description: "Analyze long-term trends and track your energy efficiency improvements over time."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-light mb-4 text-gray-900">
            Key <span className="font-semibold text-green-500">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage your energy consumption efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex p-3 rounded-xl bg-green-50 text-green-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clean Stats Section
const StatsSection = () => {
  const [count, setCount] = useState({
    savings: 0,
    monitoring: 0,
    customers: 0,
    uptime: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { key: 'savings', target: 30, suffix: "%", label: "Average Energy Savings", icon: <Zap className="w-6 h-6" /> },
    { key: 'monitoring', target: 24, suffix: "/7", label: "Real-time Monitoring", icon: <Activity className="w-6 h-6" /> },
    { key: 'customers', target: 10000, suffix: "+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { key: 'uptime', target: 99.9, suffix: "%", label: "System Uptime", icon: <Globe className="w-6 h-6" /> }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;

          stats.forEach(stat => {
            let current = 0;
            const increment = stat.target / steps;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              
              setCount(prev => ({
                ...prev,
                [stat.key]: stat.key === 'customers' ? Math.floor(current) : Number(current.toFixed(1))
              }));
            }, interval);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="stats-section" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4 text-gray-900">
            Proven <span className="font-semibold text-green-500">Results</span>
          </h2>
          <p className="text-lg text-gray-600">Numbers that demonstrate our impact</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                <div className="text-4xl font-bold text-green-500 mb-2">
                  {count[stat.key]}{stat.suffix}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Minimal Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      quote: "LumioFlow helped us reduce our energy bills by 40%. The insights are clear and actionable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The system transformed how we manage our business energy consumption. Highly recommended.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Environmental Consultant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Finally, a solution that makes sustainable living accessible and easy to understand.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light mb-4 text-gray-900">
            What Our <span className="font-semibold text-green-500">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by thousands of energy-conscious customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=22c55e&color=fff`;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-green-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-green-500 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clean How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Connect Hardware",
      description: "Connect ESP32 with ACS712 current sensor and ZMPT101B voltage sensor to your electrical system.",
      icon: "🔌"
    },
    {
      step: 2, 
      title: "Real-time Monitoring",
      description: "ESP32 continuously measures voltage and current, calculating power consumption in real-time.",
      icon: "📊"
    },
    {
      step: 3,
      title: "Data Processing",
      description: "Sensor data is processed and sent to our cloud platform for analysis and visualization.",
      icon: "💡"
    },
    {
      step: 4,
      title: "Smart Insights",
      description: "Get detailed insights about your power consumption patterns and optimization suggestions.",
      icon: "💰"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light mb-4 text-gray-900">
            How It <span className="font-semibold text-green-500">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Get started in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative bg-gray-50 rounded-2xl p-8 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>

                <div className="text-4xl mb-6 opacity-80">{step.icon}</div>
                
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-12 py-4 bg-green-500 text-white rounded-full font-medium text-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98">
            <span className="flex items-center gap-2">
              Start Your Journey Today
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <HowItWorksSection />
    </div>
  );
};

export default Home;