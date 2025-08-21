import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/layout/Navigation';
import CapsuleCard from '@/components/capsule/CapsuleCard';
import StatsOverview from '@/components/dashboard/StatsOverview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const { data: capsules, isLoading } = useQuery({
    queryKey: ['/api/capsules', searchQuery, filterStatus],
    enabled: false, // Disable until backend is implemented
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/user/stats'],
    enabled: false, // Disable until backend is implemented
  });

  // Mock capsule data for demonstration
  const mockCapsules = [
    {
      id: '1',
      title: 'Letter to Future Me',
      content: { text: 'A reflection on my goals and dreams for the year ahead...' },
      deliveryDate: new Date('2025-01-01'),
      status: 'scheduled' as const,
      recipients: ['me@example.com'],
      isPublic: false,
      createdAt: new Date('2024-12-15'),
    },
    {
      id: '2',
      title: 'Birthday Surprise 2025',
      content: { text: 'Happy birthday! Here\'s a message from your past self...' },
      deliveryDate: new Date('2025-03-15'),
      status: 'scheduled' as const,
      recipients: ['friend@example.com', 'family@example.com'],
      isPublic: false,
      createdAt: new Date('2024-12-10'),
    },
    {
      id: '3',
      title: 'Thoughts on AI Future',
      content: { text: 'Recording my predictions about artificial intelligence...' },
      deliveryDate: null,
      status: 'draft' as const,
      recipients: [],
      isPublic: false,
      createdAt: new Date('2024-12-12'),
    },
  ];

  const filteredCapsules = mockCapsules.filter(capsule => {
    const matchesSearch = capsule.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || capsule.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const groupedCapsules = {
    upcoming: filteredCapsules.filter(c => c.status === 'scheduled'),
    delivered: filteredCapsules.filter(c => c.status === 'delivered'),
    drafts: filteredCapsules.filter(c => c.status === 'draft'),
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tva-orange to-timeline-green bg-clip-text text-transparent animate-cascade-in" data-testid="dashboard-title">
            Your Timeline
          </h1>
          <p className="text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
            Manage your temporal messages across past, present, and future
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 animate-cascade-in cascade-delay-2">
          <StatsOverview stats={{
            totalCapsules: mockCapsules.length,
            scheduledCapsules: groupedCapsules.upcoming.length,
            deliveredCapsules: groupedCapsules.delivered.length,
            draftCapsules: groupedCapsules.drafts.length,
          }} />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-cascade-in cascade-delay-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search your capsules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="search-capsules"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              data-testid="filter-all"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'scheduled' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('scheduled')}
              data-testid="filter-scheduled"
            >
              Scheduled
            </Button>
            <Button
              variant={filterStatus === 'delivered' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('delivered')}
              data-testid="filter-delivered"
            >
              Delivered
            </Button>
            <Button
              variant={filterStatus === 'draft' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('draft')}
              data-testid="filter-drafts"
            >
              Drafts
            </Button>
          </div>
        </div>

        {/* Capsule Tabs */}
        <Tabs defaultValue="upcoming" className="animate-cascade-in cascade-delay-4">
          <TabsList className="glassmorphism mb-8" data-testid="capsule-tabs">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-tva-orange data-[state=active]:text-white">
              Upcoming ({groupedCapsules.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="data-[state=active]:bg-timeline-green data-[state=active]:text-white">
              Delivered ({groupedCapsules.delivered.length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Drafts ({groupedCapsules.drafts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedCapsules.upcoming.length === 0 ? (
                <div className="col-span-full text-center py-12" data-testid="no-upcoming-capsules">
                  <p className="text-gray-500 dark:text-gray-400">No upcoming capsules found.</p>
                </div>
              ) : (
                groupedCapsules.upcoming.map((capsule, index) => (
                  <div
                    key={capsule.id}
                    className="animate-cascade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CapsuleCard capsule={capsule} />
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="delivered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedCapsules.delivered.length === 0 ? (
                <div className="col-span-full text-center py-12" data-testid="no-delivered-capsules">
                  <p className="text-gray-500 dark:text-gray-400">No delivered capsules found.</p>
                </div>
              ) : (
                groupedCapsules.delivered.map((capsule, index) => (
                  <div
                    key={capsule.id}
                    className="animate-cascade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CapsuleCard capsule={capsule} />
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedCapsules.drafts.length === 0 ? (
                <div className="col-span-full text-center py-12" data-testid="no-draft-capsules">
                  <p className="text-gray-500 dark:text-gray-400">No draft capsules found.</p>
                </div>
              ) : (
                groupedCapsules.drafts.map((capsule, index) => (
                  <div
                    key={capsule.id}
                    className="animate-cascade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CapsuleCard capsule={capsule} />
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
