import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

export function GenerateButton({ onClick, isGenerating }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isGenerating}
      size="lg"
      className={cn(
        'w-full sm:w-auto px-8 py-6 text-lg font-bold',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'shadow-button hover:shadow-lg transition-all duration-300',
        'transform hover:scale-105 active:scale-95',
        isGenerating && 'animate-pulse'
      )}
    >
      <Sparkles className={cn('mr-2 h-5 w-5', isGenerating && 'animate-spin')} />
      {isGenerating ? 'Generating...' : 'Generate Excuse!'}
    </Button>
  );
}
