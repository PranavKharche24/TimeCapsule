import Navigation from '@/components/layout/Navigation';
import CapsuleCreationForm from '@/components/capsule/CapsuleCreationForm';

export default function CreateCapsule() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-cascade-in" data-testid="create-capsule-title">
            <span className="bg-gradient-to-r from-tva-orange to-pruning-red bg-clip-text text-transparent">
              Craft Your Message
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 animate-cascade-in cascade-delay-1">
            Rich editor with multimedia support and AI enhancements
          </p>
        </div>

        {/* Creation Form */}
        <div className="max-w-4xl mx-auto animate-cascade-in cascade-delay-2">
          <CapsuleCreationForm />
        </div>
      </div>
    </div>
  );
}
