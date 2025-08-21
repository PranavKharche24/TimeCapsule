import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Brain, Bold, Italic, Underline, Image, Mic, Video, Save, Rocket } from 'lucide-react';
import MediaUpload from './MediaUpload';

const capsuleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required'),
  deliveryDate: z.string().optional(),
  recipients: z.array(z.string().email()).optional(),
  isPublic: z.boolean().default(false),
  aiReflectionEnabled: z.boolean().default(false),
});

type CapsuleFormData = z.infer<typeof capsuleSchema>;

export default function CapsuleCreationForm() {
  const [recipientInput, setRecipientInput] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CapsuleFormData>({
    resolver: zodResolver(capsuleSchema),
    defaultValues: {
      title: '',
      content: '',
      deliveryDate: '',
      recipients: [],
      isPublic: false,
      aiReflectionEnabled: false,
    },
  });

  const addRecipient = () => {
    if (recipientInput && recipientInput.includes('@') && !recipients.includes(recipientInput)) {
      const newRecipients = [...recipients, recipientInput];
      setRecipients(newRecipients);
      form.setValue('recipients', newRecipients);
      setRecipientInput('');
    }
  };

  const removeRecipient = (email: string) => {
    const newRecipients = recipients.filter(r => r !== email);
    setRecipients(newRecipients);
    form.setValue('recipients', newRecipients);
  };

  const onSubmit = async (data: CapsuleFormData, isDraft: boolean = false) => {
    setIsLoading(true);
    try {
      const capsuleData = {
        ...data,
        recipients,
        status: isDraft ? 'draft' : 'scheduled',
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
      };
      
      // TODO: Implement capsule creation API call
      console.log('Creating capsule:', capsuleData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error creating capsule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glassmorphism rounded-2xl p-8" data-testid="capsule-creation-form">
      <form className="space-y-8">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-lg font-semibold">Capsule Title</Label>
          <Input
            id="title"
            placeholder="Give your time capsule a memorable title..."
            {...form.register('title')}
            className="mt-2 glassmorphism border-white/20 focus:border-tva-orange"
            data-testid="input-title"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-pruning-red mt-1" data-testid="error-title">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">Content</Label>
          
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Button type="button" variant="ghost" size="sm" data-testid="format-bold">
                <Bold className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" data-testid="format-italic">
                <Italic className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" data-testid="format-underline">
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <Button type="button" variant="ghost" size="sm" className="hover:bg-timeline-green/20" data-testid="add-image">
                <Image className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="hover:bg-timeline-green/20" data-testid="add-audio">
                <Mic className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="hover:bg-timeline-green/20" data-testid="add-video">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Textarea */}
          <Textarea
            placeholder="Write your message to the future..."
            className="min-h-64 glassmorphism border-white/20 focus:border-tva-orange"
            {...form.register('content')}
            data-testid="textarea-content"
          />
          {form.formState.errors.content && (
            <p className="text-sm text-pruning-red mt-1" data-testid="error-content">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        {/* Media Upload */}
        <MediaUpload />

        {/* Delivery Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <Card className="glassmorphism" data-testid="delivery-date-section">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2 text-tva-orange" />
                Delivery Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="datetime-local"
                {...form.register('deliveryDate')}
                className="glassmorphism border-white/20 focus:border-tva-orange"
                data-testid="input-delivery-date"
              />
              <div className="mt-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Choose when this capsule will unlock
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card className="glassmorphism" data-testid="recipients-section">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-timeline-green" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {recipients.map((email) => (
                  <span 
                    key={email} 
                    className="px-3 py-1 bg-tva-orange/20 text-tva-orange rounded-full text-sm flex items-center"
                    data-testid={`recipient-chip-${email}`}
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeRecipient(email)}
                      className="ml-2 hover:text-pruning-red"
                      data-testid={`remove-recipient-${email}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Add recipient email..."
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecipient())}
                  className="flex-1 glassmorphism border-white/20 focus:border-timeline-green"
                  data-testid="input-recipient"
                />
                <Button 
                  type="button" 
                  onClick={addRecipient}
                  variant="outline"
                  data-testid="add-recipient-button"
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Public Capsule Toggle */}
          <div className="flex items-center justify-between p-4 glassmorphism rounded-xl">
            <div>
              <div className="font-semibold">Public Capsule</div>
              <div className="text-sm text-gray-500">Allow this capsule to appear in the community timeline</div>
            </div>
            <Switch
              {...form.register('isPublic')}
              data-testid="toggle-public-capsule"
            />
          </div>

          {/* AI Reflection Toggle */}
          <div className="p-4 bg-gradient-to-r from-timeline-green/10 to-tva-orange/10 rounded-xl border border-timeline-green/20">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-timeline-green" />
                  AI Reflection Enhancement
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">Generate an AI reflection when this capsule unlocks</p>
              </div>
              <Switch
                {...form.register('aiReflectionEnabled')}
                data-testid="toggle-ai-reflection"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSubmit(form.getValues(), true)}
            disabled={isLoading}
            className="sm:flex-1"
            data-testid="save-draft-button"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            type="button"
            onClick={() => onSubmit(form.getValues(), false)}
            disabled={isLoading}
            className="sm:flex-1 bg-gradient-to-r from-tva-orange to-pruning-red hover:opacity-90"
            data-testid="seal-capsule-button"
          >
            <Rocket className="w-4 h-4 mr-2" />
            {isLoading ? 'Sealing...' : 'Seal Capsule'}
          </Button>
        </div>
      </form>
    </div>
  );
}
