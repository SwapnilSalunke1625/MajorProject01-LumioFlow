import React from 'react';
import Lakhabhau from './lakhabhau.jpg';
import { 
  Cpu, 
  TrendingUp, 
  Shield, 
  Users, 
  Lightbulb, 
  Zap, 
  Award, 
  Rocket, 
  Handshake, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  CheckCircle,
  Target,
  Eye,
  Heart,
  ArrowRight,
  Star,
  Building,
  Globe,
  Calendar
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "ESP32-Powered",
      description: "Advanced ESP32 microcontroller for real-time energy monitoring and intelligent data processing",
      highlight: "Smart Technology"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description: "Precise measurements from ACS712 and ZMPT101B sensors with instant data visualization",
      highlight: "Live Monitoring"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security protocols ensuring your energy data remains protected and private",
      highlight: "Secure & Reliable"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Centric Design",
      description: "Intuitive interface designed for seamless user experience across all technical levels",
      highlight: "Easy to Use"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Smart Optimization",
      description: "AI-powered insights help identify energy waste and optimize consumption patterns",
      highlight: "Cost Savings"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "IoT Integration",
      description: "Seamless integration with smart home ecosystems and industrial IoT platforms",
      highlight: "Connected Future"
    }
  ];

  const teamMembers = [
    {
      name: "Swapnil Salunke",
      role: "Project Lead & Backend Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFROxwps6mvyQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700409931876?e=2147483647&v=beta&t=FnIA9gZGWrUnZoEycVdcSLwPcp5ow5ZWqZ3kd0SM-M8",
      social: {
        github: "#",
        linkedin: "https://in.linkedin.com/in/swapnil-salunke-228337263",
        twitter: "#",
        email: "swapnil@lumioflow.com"
      },
      bio: "Backend Engineer with 3+ years of experience in backend development and system architecture",
      expertise: ["Backend Development", "System Architecture", "Database Design"]
    },
    {
      name: "Vishal Dhangare",
      role: "Frontend Lead & UX Designer & Android Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQF1uuZTxskJmA/profile-displayphoto-shrink_200_200/B56ZSJIo11GsAY-/0/1737467539996?e=2147483647&v=beta&t=O5CBzfqnapbycda4D9PWm5sWRxuw6lLleXfCeAsAwYQ",
      social: {
        github: "#",
        linkedin: "https://media.licdn.com/dms/image/v2/D5603AQF1uuZTxskJmA/profile-displayphoto-shrink_200_200/B56ZSJIo11GsAY-/0/1737467539996?e=2147483647&v=beta&t=O5CBzfqnapbycda4D9PWm5sWRxuw6lLleXfCeAsAwYQ",
        twitter: "#",
        email: "vishal@lumioflow.com"
      },
      bio: "Creative developer specializing in modern web technologies and user experience and android development",
      expertise: ["React Development", "UI/UX Design", "Frontend Architecture", "Android Development"]
    },
    {
      name: "Laxmikant Tawde",
      role: "Backend Engineer & DevOps",
      image: Lakhabhau,

      social: {
        github: "#",
        linkedin: "https://in.linkedin.com/in/laxmikant-tawde-60b334383",
        twitter: "#",
        email: "laxmikant@lumioflow.com"
      },
      bio: "Expert in scalable backend systems and cloud infrastructure management",
      expertise: ["Backend Development", "Cloud Architecture", "Database Design"]
    },
    {
      name: "Rohit Borde",
      role: "Iot Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFUG1oToQeUCQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1688889671841?e=2147483647&v=beta&t=SHEEk6B6_DAHGoLHo8cahEq5ObtoBCR97KBLiEFL4NM",
      social: {
        github: "#",
        linkedin: "https://in.linkedin.com/in/rohit-borde-b50661282",
        twitter: "#",
        email: "rohit@lumioflow.com"
      },
      bio: "IoT Engineer with 3+ years of experience in IoT development and system architecture",
      expertise: ["IoT Development", "System Architecture", "Energy Analytics"]
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation Excellence",
      description: "Recognized for breakthrough energy monitoring solution",
      metric: "Award Winner 2024",
      color: "text-yellow-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Growing Community",
      description: "Trusted by customers worldwide",
      metric: "1,000+ Users",
      color: "text-blue-600"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Industry Partnerships",
      description: "Collaborating with leading energy companies",
      metric: "15+ Partners",
      color: "text-green-600"
    }
  ];

  const companyValues = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission",
      description: "Making energy monitoring accessible, intelligent, and sustainable for everyone."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Vision",
      description: "A world where energy consumption is transparent, optimized, and environmentally conscious."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Values",
      description: "Innovation, sustainability, user-centricity, and continuous improvement drive everything we do."
    }
  ];

  const technologies = {
    hardware: [
      { name: "ESP32 Microcontroller", description: "Dual-core processor with WiFi & Bluetooth" },
      { name: "ACS712 Current Sensor", description: "High-precision 0-30A current measurement" },
      { name: "ZMPT101B Voltage Transformer", description: "Accurate voltage sensing and isolation" },
      { name: "Custom PCB Design", description: "Optimized circuit layout for reliability" }
    ],
    software: [
      { name: "React Frontend", description: "Modern, responsive user interface" },
      { name: "Node.js Backend", description: "Scalable server-side architecture" },
      { name: "MongoDB Database", description: "Flexible document-based storage" },
      { name: "Real-time APIs", description: "WebSocket connections for live data" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Revolutionizing Energy Monitoring Since 2024
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-green-600">LumioFlow</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're pioneering the future of energy monitoring with intelligent ESP32-based solutions 
              that empower homes and businesses to take control of their energy consumption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-200"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-200 text-gray-700 hover:text-green-700 px-8 py-3 rounded-xl font-medium transition-all duration-300"
              >
                View Products
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:shadow-green-100 transition-all duration-300">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-green-600">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LumioFlow?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge technology and user-focused approach make energy monitoring simple, accurate, and actionable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <span className="text-green-600">{feature.icon}</span>
                  </div>
                  <div>
                    <span className="inline-block bg-gray-50 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium mb-2">
                      {feature.highlight}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Milestones that reflect our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className={achievement.color}>{achievement.icon}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{achievement.metric}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-lg text-gray-600">Built with modern, reliable technologies</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Hardware Components</h3>
              </div>
              <div className="space-y-4">
                {technologies.hardware.map((tech, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{tech.name}</div>
                      <div className="text-sm text-gray-600">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Software Stack</h3>
              </div>
              <div className="space-y-4">
                {technologies.software.map((tech, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{tech.name}</div>
                      <div className="text-sm text-gray-600">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate minds behind LumioFlow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-100 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-600 fill-current" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-white text-gray-600 text-xs rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <a href={member.social.github} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={member.social.linkedin} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.social.twitter} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Energy Journey?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already transformed their energy management with LumioFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium transition-all duration-300"
              >
                View Products
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Contact Sales
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;