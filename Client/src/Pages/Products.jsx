import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Cpu, 
  TrendingUp, 
  Smartphone, 
  Shield, 
  Database, 
  Wifi, 
  Monitor,
  CheckCircle,
  Star,
  Play,
  Download,
  ShoppingCart,
  ArrowRight,
  Package,
  Truck,
  Headphones,
  Award,
  BarChart3,
  Activity,
  Settings,
  Eye,
  Clock,
  DollarSign,
  ChevronDown,
  MousePointer,
  Sparkles
} from 'lucide-react';

const Products = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [energyData, setEnergyData] = useState({ voltage: 230, current: 2.5, power: 575 });
  const [currentFeature, setCurrentFeature] = useState(0);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate live energy data
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData({
        voltage: 220 + Math.random() * 20,
        current: 2 + Math.random() * 2,
        power: 500 + Math.random() * 200
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.section]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-section]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Power Monitoring",
      description: "Precise measurement with 99.9% accuracy using advanced sensors",
      highlight: "Live Data",
      color: "from-yellow-400 to-orange-500",
      particles: 12
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "ESP32 Intelligence",
      description: "Dual-core processing with AI-powered analytics",
      highlight: "Smart Processing",
      color: "from-blue-400 to-purple-500",
      particles: 8
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "Machine learning algorithms predict energy patterns",
      highlight: "AI-Powered",
      color: "from-green-400 to-blue-500",
      particles: 15
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Universal Connectivity",
      description: "Works with iOS, Android, and web platforms seamlessly",
      highlight: "Cross-Platform",
      color: "from-purple-400 to-pink-500",
      particles: 10
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Military-Grade Security",
      description: "Bank-level encryption with quantum-resistant protocols",
      highlight: "Ultra Secure",
      color: "from-red-400 to-pink-500",
      particles: 6
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Infinite Data Storage",
      description: "Unlimited cloud storage with 99.99% uptime guarantee",
      highlight: "Unlimited",
      color: "from-teal-400 to-green-500",
      particles: 20
    }
  ];

  const FloatingParticles = ({ count, delay = 0 }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${delay + Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    );
  };

  const GlowingOrb = ({ size = "w-2 h-2", color = "bg-green-400", delay = 0 }) => (
    <div 
      className={`${size} ${color} rounded-full relative animate-pulse`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`absolute inset-0 ${size} ${color} rounded-full animate-ping opacity-75`}></div>
      <div className={`absolute inset-0 ${size} bg-white rounded-full animate-pulse opacity-50`}></div>
    </div>
  );

  const HolographicCard = ({ children, className = "", glowColor = "green" }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    return (
      <div
        ref={cardRef}
        className={`relative transform-gpu transition-all duration-300 ${className}`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-2xl blur-xl transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
        {children}
      </div>
    );
  };

  const InteractiveCircuit = () => (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Floating components */}
      <div className="absolute top-16 left-16 transform hover:scale-110 transition-transform duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
          <Cpu className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-mono whitespace-nowrap">
          ESP32
        </div>
      </div>
      
      <div className="absolute top-16 right-16 transform hover:scale-110 transition-transform duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-blue-400 text-xs font-mono whitespace-nowrap">
          ACS712
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hover:scale-110 transition-transform duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/50">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs font-mono whitespace-nowrap">
          ZMPT101B
        </div>
      </div>

      {/* Animated connection lines */}
      <div className="absolute top-24 left-24 w-px h-32 bg-gradient-to-b from-green-400 to-blue-400 animate-pulse"></div>
      <div className="absolute top-24 right-24 w-px h-32 bg-gradient-to-b from-blue-400 to-yellow-400 animate-pulse"></div>
      <div className="absolute bottom-24 left-1/2 w-32 h-px bg-gradient-to-r from-yellow-400 to-green-400 animate-pulse transform -translate-x-1/2"></div>
    </div>
  );

  const LiveDataDisplay = () => (
    <div className="bg-black rounded-xl p-6 border border-green-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10"></div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <GlowingOrb size="w-3 h-3" />
          <span className="text-green-400 font-mono text-sm">LIVE DATA STREAM</span>
        </div>
        <div className="grid grid-cols-3 gap-4 font-mono">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {energyData.voltage.toFixed(1)}V
            </div>
            <div className="text-xs text-gray-400">VOLTAGE</div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
              <div 
                className="bg-green-400 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${(energyData.voltage / 250) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {energyData.current.toFixed(2)}A
            </div>
            <div className="text-xs text-gray-400">CURRENT</div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
              <div 
                className="bg-blue-400 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${(energyData.current / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round(energyData.power)}W
            </div>
            <div className="text-xs text-gray-400">POWER</div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
              <div 
                className="bg-yellow-400 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${(energyData.power / 800) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MorphingFeatureCard = ({ feature, isActive, index }) => (
    <div 
      className={`relative p-8 rounded-2xl border-2 transition-all duration-1000 transform hover:scale-105 ${
        isActive 
          ? 'border-green-400 bg-gradient-to-br from-green-50 to-white scale-105 shadow-2xl shadow-green-200' 
          : 'border-gray-200 bg-white hover:border-green-200 hover:shadow-lg'
      }`}
    >
      {isActive && <FloatingParticles count={feature.particles} />}
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
        isActive ? `bg-gradient-to-r ${feature.color}` : 'bg-gray-100'
      }`}>
        <span className={isActive ? 'text-white' : 'text-gray-600'}>
          {feature.icon}
        </span>
      </div>
      
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {feature.highlight}
        </span>
      </div>
      
      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
        isActive ? 'text-gray-900' : 'text-gray-800'
      }`}>
        {feature.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
      
      {isActive && (
        <div className="absolute -top-2 -right-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );

  const PulsingMetric = ({ value, label, color, delay = 0 }) => (
    <div className="text-center">
      <div 
        className={`text-4xl font-bold mb-2 transition-all duration-1000 animate-pulse ${color}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {value}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Add custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 0.7; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-green-50/30 to-white overflow-hidden" data-section="hero">
        <FloatingParticles count={30} />
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className={`space-y-8 transform transition-all duration-1500 ${
              isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-green-50 px-6 py-3 rounded-full border border-green-200 animate-pulse">
                  <div className="flex space-x-1">
                    <GlowingOrb size="w-2 h-2" delay={0} />
                    <GlowingOrb size="w-2 h-2" delay={0.5} />
                    <GlowingOrb size="w-2 h-2" delay={1} />
                  </div>
                  <span className="text-green-700 font-semibold">Revolutionary Energy Monitoring</span>
                </div>
                
                <h1 className="text-7xl font-black text-gray-900 leading-tight">
                  Future of
                  <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Smart Energy
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience next-generation energy monitoring with our AI-powered ESP32 system. 
                  Real-time insights, predictive analytics, and autonomous optimization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-green-200 hover:shadow-green-300 transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <MousePointer className="w-5 h-5" />
                    Experience Now
                  </span>
                </button>
                
                <button className="group flex items-center gap-3 text-gray-700 hover:text-green-700 font-semibold text-lg transition-colors duration-300">
                  <div className="w-12 h-12 border-2 border-gray-300 group-hover:border-green-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-green-50">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                  Watch Innovation
                </button>
              </div>

              {/* Live metrics */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <PulsingMetric value="99.9%" label="Accuracy" color="text-green-600" delay={0} />
                <PulsingMetric value="<1ms" label="Latency" color="text-blue-600" delay={0.5} />
                <PulsingMetric value="24/7" label="Monitoring" color="text-purple-600" delay={1} />
              </div>
            </div>

            {/* Interactive Hologram */}
            <div className={`relative transform transition-all duration-2000 ${
              isVisible.hero ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="relative">
                <HolographicCard className="w-full" glowColor="green">
                  <InteractiveCircuit />
                </HolographicCard>
                
                {/* Floating live data */}
                <div className="absolute -bottom-6 -right-6 transform hover:scale-105 transition-transform duration-300">
                  <LiveDataDisplay />
                </div>
                
                {/* Orbiting status indicators */}
                <div className="absolute -top-4 -left-4 animate-spin" style={{animationDuration: '20s'}}>
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      <GlowingOrb color="bg-green-400" />
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <GlowingOrb color="bg-blue-400" delay={0.5} />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <GlowingOrb color="bg-purple-400" delay={1} />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <GlowingOrb color="bg-yellow-400" delay={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-green-600" />
        </div>
      </section>

      {/* Morphing Features Showcase */}
      <section className="py-32 relative" data-section="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Breakthrough <span className="text-green-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary capabilities that redefine energy monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <MorphingFeatureCard 
                key={index}
                feature={feature}
                isActive={currentFeature === index}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden" data-section="cta">
        <FloatingParticles count={50} />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Energy?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the energy revolution with our cutting-edge ESP32 monitoring system. 
              Advanced analytics, real-time insights, and unprecedented control.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Now - ₹1449
                </span>
              </button>
              
              <button className="group flex items-center gap-3 border border-gray-600 hover:border-green-400 text-gray-300 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-green-400/10">
                <Download className="w-5 h-5" />
                Download Specs
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-12 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-green-400" />
                Free Worldwide Shipping
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-400" />
                Express 2-Day Delivery
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-green-400" />
                24/7 Expert Support
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;