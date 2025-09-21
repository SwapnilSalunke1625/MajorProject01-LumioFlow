import React, { useState } from 'react';
import { Search, Book, Video, Code, Lightbulb, FileText, Wrench, Github, MessageCircle, HelpCircle, ChevronRight, Clock, Tag, Filter, BookOpen, Download, ExternalLink, Star, Users, Zap } from 'lucide-react';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const resources = [
    {
      category: "Documentation",
      icon: <Book className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          title: "ESP32 Energy Meter Setup Guide",
          description: "Complete step-by-step guide for setting up your ESP32-based energy monitoring system",
          link: "#",
          tags: ["hardware", "setup", "beginner"],
          type: "guide",
          readTime: "15 min read",
          difficulty: "Beginner",
          featured: true
        },
        {
          title: "Hardware Specifications",
          description: "Detailed technical specifications for ACS712 and ZMPT101B sensors",
          link: "#",
          tags: ["hardware", "specs", "technical"],
          type: "reference",
          readTime: "8 min read",
          difficulty: "Intermediate"
        },
        {
          title: "API Reference Guide",
          description: "Complete API documentation with examples and best practices",
          link: "#",
          tags: ["api", "integration", "reference"],
          type: "reference",
          readTime: "20 min read",
          difficulty: "Advanced"
        }
      ]
    },
    {
      category: "Video Tutorials",
      icon: <Video className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          title: "Getting Started with Energy Monitoring",
          description: "Learn the basics of setting up your first energy monitoring project",
          link: "https://www.youtube.com/watch?v=example1",
          tags: ["beginner", "tutorial", "setup"],
          type: "video",
          duration: "15:30",
          views: "12.5K",
          featured: true
        },
        {
          title: "Advanced Sensor Calibration",
          description: "Master the art of precise sensor calibration for accurate readings",
          link: "https://www.youtube.com/watch?v=example2",
          tags: ["advanced", "calibration", "sensors"],
          type: "video",
          duration: "22:15",
          views: "8.2K"
        },
        {
          title: "Dashboard Customization",
          description: "Create beautiful, functional dashboards for your energy data",
          link: "https://www.youtube.com/watch?v=example3",
          tags: ["ui", "dashboard", "customization"],
          type: "video",
          duration: "18:45",
          views: "15.7K"
        }
      ]
    },
    {
      category: "Code Examples",
      icon: <Code className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          title: "ESP32 Arduino Code Library",
          description: "Production-ready Arduino code for ESP32 energy monitoring",
          link: "#",
          tags: ["arduino", "esp32", "library"],
          type: "code",
          language: "C++",
          stars: "234"
        },
        {
          title: "Python Data Analysis Scripts",
          description: "Analyze and visualize your energy consumption data with Python",
          link: "#",
          tags: ["python", "analysis", "visualization"],
          type: "code",
          language: "Python",
          stars: "156"
        },
        {
          title: "React Dashboard Components",
          description: "Reusable React components for energy monitoring dashboards",
          link: "#",
          tags: ["react", "components", "dashboard"],
          type: "code",
          language: "JavaScript",
          stars: "89"
        }
      ]
    },
    {
      category: "Best Practices",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          title: "Energy Optimization Strategies",
          description: "Proven methods to reduce energy consumption and costs",
          link: "#",
          tags: ["optimization", "efficiency", "cost-saving"],
          type: "guide",
          readTime: "12 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Safety Guidelines & Best Practices",
          description: "Essential safety protocols when working with electrical systems",
          link: "#",
          tags: ["safety", "guidelines", "electrical"],
          type: "guide",
          readTime: "10 min read",
          difficulty: "Beginner"
        }
      ]
    }
  ];

  const stats = [
    { label: "Total Resources", value: "24", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Downloads", value: "12.4K", icon: <Download className="w-5 h-5" /> },
    { label: "Community", value: "3.2K", icon: <Users className="w-5 h-5" /> },
    { label: "Updates", value: "Weekly", icon: <Zap className="w-5 h-5" /> }
  ];

  const filteredResources = resources.filter(category => {
    if (selectedCategory === 'all') return true;
    return category.category.toLowerCase().replace(' ', '').includes(selectedCategory.toLowerCase());
  });

  const allItems = filteredResources.flatMap(category =>
    category.items
      .filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map(item => ({ ...item, category: category.category, categoryIcon: category.icon }))
  );

  const featuredItems = allItems.filter(item => item.featured);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const ResourceCard = ({ item, featured = false }) => (
    <div className={`group bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg hover:shadow-green-100 hover:-translate-y-1 ${featured ? 'border-green-200 shadow-md' : 'border-gray-100'}`}>
      {featured && (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-t-2xl border-b border-green-100">
          <Star className="w-4 h-4 text-green-600 fill-current" />
          <span className="text-sm font-medium text-green-700">Featured</span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              {item.categoryIcon}
            </div>
            <div>
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                {item.category}
              </span>
              {item.difficulty && (
                <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              )}
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          {item.readTime && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {item.readTime}
            </div>
          )}
          {item.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Video className="w-3 h-3" />
              {item.duration}
            </div>
          )}
          {item.language && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Code className="w-3 h-3" />
              {item.language}
            </div>
          )}
          {item.stars && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3" />
              {item.stars}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-lg">
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <br /><br />
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Energy Monitoring Resources
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to build, deploy, and optimize your energy monitoring system
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mx-auto mb-2">
                    <span className="text-green-600">{stat.icon}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, guides, tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="documentation">Documentation</option>
                  <option value="videotutorials">Video Tutorials</option>
                  <option value="codeexamples">Code Examples</option>
                  <option value="bestpractices">Best Practices</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Resources */}
        {featuredItems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredItems.map((item, index) => (
                <ResourceCard key={index} item={item} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Resources */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              All Resources {searchQuery && `(${allItems.length} results)`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allItems.map((item, index) => (
              <ResourceCard key={index} item={item} />
            ))}
          </div>

          {allItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-16">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Community & Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#"
                className="group p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <Github className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">GitHub Repository</h3>
                  <p className="text-sm text-gray-600">Access source code, report issues, and contribute</p>
                </div>
              </a>
              
              <a
                href="#"
                className="group p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <MessageCircle className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600">Connect with other developers and get help</p>
                </div>
              </a>
              
              <a
                href="#"
                className="group p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <HelpCircle className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support Center</h3>
                  <p className="text-sm text-gray-600">Get technical support and documentation help</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;