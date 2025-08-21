import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Bell, Shield, Award } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - replace with actual API call
  const { data: user } = useQuery({
    queryKey: ['/api/user/me'],
    enabled: false, // Disable until backend is implemented
  });

  // Mock user data for demonstration
  const mockUser = {
    id: '1',
    username: 'temporal_traveler',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: null,
    createdAt: new Date('2024-01-15'),
  };

  const mockStats = {
    totalCapsules: 15,
    capsulesCreated: 12,
    capsulesReceived: 8,
    longestCapsule: '2 years, 3 months',
  };

  const mockBadges = [
    { id: '1', name: 'First Capsule', description: 'Created your first time capsule', earned: true },
    { id: '2', name: 'Future Traveler', description: 'Created a capsule for 1+ year in the future', earned: true },
    { id: '3', name: 'Time Master', description: 'Created 10+ time capsules', earned: true },
    { id: '4', name: 'Community Contributor', description: 'Shared 5+ public capsules', earned: false },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tva-orange to-timeline-green bg-clip-text text-transparent animate-cascade-in" data-testid="profile-title">
            Profile & Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
            Manage your account and temporal preferences
          </p>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="animate-cascade-in cascade-delay-2">
          <TabsList className="glassmorphism mb-8" data-testid="profile-tabs">
            <TabsTrigger value="profile" className="data-[state=active]:bg-tva-orange data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-timeline-green data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-pruning-red data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-8">
            {/* Profile Information */}
            <Card className="glassmorphism" data-testid="profile-info-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Profile Information</span>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? 'destructive' : 'outline'}
                    data-testid="edit-profile-button"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-timeline-green to-tva-orange rounded-full flex items-center justify-center">
                    <User className="text-white text-2xl" />
                  </div>
                  {isEditing && (
                    <Button variant="outline" data-testid="change-picture-button">
                      Change Picture
                    </Button>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={mockUser.firstName || ''}
                      disabled={!isEditing}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={mockUser.lastName || ''}
                      disabled={!isEditing}
                      data-testid="input-last-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={mockUser.username}
                      disabled={!isEditing}
                      data-testid="input-username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={mockUser.email}
                      disabled={!isEditing}
                      data-testid="input-email"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button className="bg-gradient-to-r from-tva-orange to-timeline-green" data-testid="save-profile-button">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="cancel-edit-button">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="glassmorphism" data-testid="profile-stats-card">
              <CardHeader>
                <CardTitle>Your Timeline Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-tva-orange">{mockStats.totalCapsules}</div>
                    <div className="text-sm text-gray-500">Total Capsules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-timeline-green">{mockStats.capsulesCreated}</div>
                    <div className="text-sm text-gray-500">Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pruning-red">{mockStats.capsulesReceived}</div>
                    <div className="text-sm text-gray-500">Received</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-500">{mockStats.longestCapsule}</div>
                    <div className="text-sm text-gray-500">Longest Wait</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            {/* Notification Settings */}
            <Card className="glassmorphism" data-testid="notification-settings-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-timeline-green" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive email alerts when capsules unlock</div>
                  </div>
                  <Button variant="outline" data-testid="toggle-email-notifications">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Reminder Notifications</div>
                    <div className="text-sm text-gray-500">Get reminders before capsules unlock</div>
                  </div>
                  <Button variant="outline" data-testid="toggle-reminder-notifications">
                    Enabled
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="glassmorphism" data-testid="privacy-settings-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-tva-orange" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Public Profile</div>
                    <div className="text-sm text-gray-500">Allow others to see your public capsules</div>
                  </div>
                  <Button variant="outline" data-testid="toggle-public-profile">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Community Contributions</div>
                    <div className="text-sm text-gray-500">Allow your capsules to appear in community timeline</div>
                  </div>
                  <Button variant="outline" data-testid="toggle-community-contributions">
                    Enabled
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            {/* Achievements */}
            <Card className="glassmorphism" data-testid="achievements-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Temporal Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-xl border-2 ${
                        badge.earned
                          ? 'border-timeline-green bg-timeline-green/10'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 opacity-50'
                      }`}
                      data-testid={`badge-${badge.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          badge.earned ? 'bg-timeline-green' : 'bg-gray-400'
                        }`}>
                          <Award className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{badge.name}</div>
                          <div className="text-sm text-gray-500">{badge.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
