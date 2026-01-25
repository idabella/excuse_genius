import { Sparkles, Loader2 } from 'lucide-react';
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
        'relative px-10 py-7 text-lg font-bold rounded-2xl',
        'btn-primary transition-all duration-300',
        'transform hover:scale-105 active:scale-95',
        'disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none'
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Génération...</span>
          <div className="absolute inset-0 rounded-2xl progress-shimmer" />
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          <span>Générer une excuse !</span>
        </>
      )}
    </Button>
  );
}
