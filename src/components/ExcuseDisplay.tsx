import { Copy, Heart, Share2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categoryLabels, categoryColors, ExcuseCategory } from '@/data/excuses';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ExcuseDisplayProps {
  excuse: string | null;
  category: ExcuseCategory | null;
  isFavorite: boolean;
  onCopy: () => void;
  onSave: () => void;
  onShare: () => void;
  onRegenerate: () => void;
}

export function ExcuseDisplay({
  excuse,
  category,
  isFavorite,
  onCopy,
  onSave,
  onShare,
  onRegenerate,
}: ExcuseDisplayProps) {
  if (!excuse) {
    return (
      <div className="paper-texture rounded-xl p-8 shadow-card border-2 border-dashed border-border text-center">
        <p className="text-2xl font-handwritten text-muted-foreground">
          Your excuse will appear here... 📝
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Click the button above to generate one!
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(excuse);
      toast.success('Copied to clipboard!', {
        description: 'Now go save yourself 😎',
      });
      onCopy();
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Homework Excuse',
          text: excuse,
        });
        onShare();
      } catch (err) {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="paper-texture rounded-xl p-6 sm:p-8 shadow-card border-2 border-border">
        {category && (
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4',
              categoryColors[category]
            )}
          >
            {categoryLabels[category]}
          </span>
        )}
        <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium">
          "{excuse}"
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={handleCopy}
          className="gap-2 border-2 hover:bg-card"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onSave}
          className={cn(
            'gap-2 border-2 transition-colors',
            isFavorite
              ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
              : 'hover:bg-card'
          )}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          {isFavorite ? 'Saved!' : 'Save'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="gap-2 border-2 hover:bg-card"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={onRegenerate}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          New Excuse
        </Button>
      </div>
    </div>
  );
}
