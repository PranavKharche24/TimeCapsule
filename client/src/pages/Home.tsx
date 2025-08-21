import { Link } from 'wouter';
import { Play, Plus, Calendar, Mic, Video, Brain, Users, Bell, Shield, Rocket, Eye, MessageCircleQuestion } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-cascade-in" data-testid="hero-title">
            <span className="bg-gradient-to-r from-tva-orange via-timeline-green to-pruning-red bg-clip-text text-transparent">
              Send Messages
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              To The Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-cascade-in cascade-delay-1" data-testid="hero-description">
            Create time capsules that unlock at the perfect moment. Connect with your future self and others across the sacred timeline.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-cascade-in cascade-delay-2">
            <Link href="/create">
              <Button 
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-tva-orange to-pruning-red text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
                data-testid="create-first-capsule"
              >
                <Plus className="mr-2" />
                Create Your First Capsule
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="ghost"
              className="px-8 py-4 glassmorphism text-gray-900 dark:text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              data-testid="watch-demo"
            >
              <Play className="mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-cascade-in" data-testid="timeline-title">
              <span className="bg-gradient-to-r from-timeline-green to-tva-orange bg-clip-text text-transparent">
                Your Timeline
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
              Manage your temporal messages across past, present, and future
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="glassmorphism rounded-xl p-2 inline-flex animate-cascade-in cascade-delay-2" data-testid="timeline-tabs">
              <Button className="px-6 py-3 bg-tva-orange text-white rounded-lg font-semibold transition-all duration-300">
                Upcoming Capsules
              </Button>
              <Button variant="ghost" className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-timeline-green rounded-lg font-semibold transition-all duration-300">
                Delivered
              </Button>
              <Button variant="ghost" className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-pruning-red rounded-lg font-semibold transition-all duration-300">
                Drafts
              </Button>
            </div>
          </div>
          
          {/* Capsule Cards Grid - Sample Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="interactive-card glassmorphism rounded-xl p-6 animate-cascade-in cascade-delay-3" data-testid="sample-capsule-1">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-timeline-green/20 text-timeline-green rounded-full text-sm font-semibold">
                  Scheduled
                </span>
                <div className="text-2xl">📝</div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Letter to Future Me</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">A reflection on my goals and dreams for the year ahead...</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Unlocks: Jan 1, 2025</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Recipients: Just me</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-cosmic-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-cascade-in" data-testid="features-title">
              <span className="bg-gradient-to-r from-timeline-green to-pruning-red bg-clip-text text-transparent">
                Temporal Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
              Advanced capabilities for time-bound messaging
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Temporal Sealing',
                description: 'Lock your messages with cryptographic security until the designated unlock time.',
                gradient: 'from-tva-orange to-pruning-red'
              },
              {
                icon: Mic,
                title: 'Rich Media',
                description: 'Include text, images, audio recordings, and videos in your time capsules.',
                gradient: 'from-timeline-green to-tva-orange'
              },
              {
                icon: Brain,
                title: 'AI Reflection',
                description: 'Get AI-generated insights when your capsules unlock, comparing past and present.',
                gradient: 'from-pruning-red to-timeline-green'
              },
              {
                icon: Users,
                title: 'Group Capsules',
                description: 'Share time capsules with multiple recipients for collective future experiences.',
                gradient: 'from-timeline-green to-pruning-red'
              },
              {
                icon: Bell,
                title: 'Smart Reminders',
                description: 'Receive notifications when your capsules are about to unlock or arrive.',
                gradient: 'from-tva-orange to-timeline-green'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'End-to-end encryption ensures your messages remain private and secure.',
                gradient: 'from-pruning-red to-tva-orange'
              },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="glassmorphism rounded-xl p-6 text-center interactive-card animate-cascade-in"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glassmorphism rounded-3xl p-12 animate-cascade-in" data-testid="cta-section">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-tva-orange via-timeline-green to-pruning-red bg-clip-text text-transparent">
                Start Your Temporal Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-cascade-in cascade-delay-1">
              Join thousands of users already sending messages across the sacred timeline
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-cascade-in cascade-delay-2">
              <Link href="/register">
                <Button 
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-tva-orange to-pruning-red text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
                  data-testid="get-started-free"
                >
                  <Rocket className="mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="ghost"
                className="px-8 py-4 glassmorphism text-gray-900 dark:text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
                data-testid="learn-more"
              >
                <MessageCircleQuestion className="mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
