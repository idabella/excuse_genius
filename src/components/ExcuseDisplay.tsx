import { Copy, Heart, Share2, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categoryLabels, ExcuseCategory } from '@/data/excuses';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

interface ExcuseDisplayProps {
  excuse: string | null;
  category: ExcuseCategory | null;
  isFavorite: boolean;
  onCopy: () => void;
  onSave: () => void;
  onShare: () => void;
  onRegenerate: () => void;
}

const categoryBadgeStyles: Record<ExcuseCategory, string> = {
  health: 'bg-health text-health-accent border-health-accent/20',
  technical: 'bg-technical text-technical-accent border-technical-accent/20',
  family: 'bg-family text-family-accent border-family-accent/20',
  miscellaneous: 'bg-misc text-misc-accent border-misc-accent/20',
};

export function ExcuseDisplay({
  excuse,
  category,
  isFavorite,
  onSave,
  onRegenerate,
}: ExcuseDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!excuse) {
    return (
      <div className="card-elevated rounded-2xl p-8 sm:p-10 text-center border-2 border-dashed border-border">
        <div className="animate-float inline-block mb-4">
          <span className="text-5xl">📝</span>
        </div>
        <p className="text-xl font-display font-semibold text-muted-foreground">
          Ton excuse apparaîtra ici...
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Clique sur le bouton pour en générer une !
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(excuse);
      setCopied(true);
      toast.success('Copié dans le presse-papier ! 📋', {
        description: 'Maintenant, sauve-toi 😎',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Échec de la copie');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon excuse pour les devoirs',
          text: excuse,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="animate-pop-in space-y-6">
      {/* Excuse Card */}
      <div className="excuse-card rounded-2xl p-6 sm:p-8 shadow-card">
        {category && (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-4',
              categoryBadgeStyles[category]
            )}
          >
            {categoryLabels[category]}
          </span>
        )}
        <blockquote className="relative">
          <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium italic">
            {excuse}
          </p>
        </blockquote>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={handleCopy}
          className={cn(
            'gap-2 rounded-xl border-2 font-semibold transition-all duration-200 hover-lift',
            copied && 'bg-accent border-accent-foreground/20 text-accent-foreground'
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copier
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onSave}
          className={cn(
            'gap-2 rounded-xl border-2 font-semibold transition-all duration-200 hover-lift',
            isFavorite && 'bg-health border-health-accent/30 text-health-accent'
          )}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          {isFavorite ? 'Sauvegardé' : 'Favoris'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="gap-2 rounded-xl border-2 font-semibold transition-all duration-200 hover-lift"
        >
          <Share2 className="h-4 w-4" />
          Partager
        </Button>

        <Button
          size="lg"
          onClick={onRegenerate}
          className="gap-2 rounded-xl font-semibold btn-primary transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4" />
          Nouvelle excuse
        </Button>
      </div>
    </div>
  );
}
