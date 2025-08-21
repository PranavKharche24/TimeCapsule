import { Plus } from 'lucide-react';
import { Link } from 'wouter';

export default function FloatingActionButton() {
  return (
    <Link href="/create" data-testid="floating-create-button">
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-tva-orange to-pruning-red text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow z-50">
        <Plus className="w-6 h-6 mx-auto" />
      </button>
    </Link>
  );
}
