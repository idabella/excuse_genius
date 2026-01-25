import { Heart, Copy, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FavoriteExcuse } from '../hooks/useFavorites';
import { categoryLabels } from '../data/excuses';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FavoritesDrawerProps {
  favorites: FavoriteExcuse[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const categoryStyles = {
  health: 'bg-health text-health-accent border-health-accent/20',
  technical: 'bg-technical text-technical-accent border-technical-accent/20',
  family: 'bg-family text-family-accent border-family-accent/20',
  miscellaneous: 'bg-misc text-misc-accent border-misc-accent/20',
};

export function FavoritesDrawer({ favorites, onRemove, onClear }: FavoritesDrawerProps) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copié ! 📋');
    } catch (err) {
      toast.error('Échec de la copie');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-2xl border-2 shadow-card hover-lift fixed bottom-6 right-6 z-50 bg-card font-semibold"
        >
          <Heart className="h-5 w-5 text-health-accent fill-health-accent" />
          <span>Favoris</span>
          {favorites.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-bold">
              {favorites.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-l-2">
        <SheetHeader className="text-left pb-4">
          <SheetTitle className="text-2xl font-display font-bold flex items-center gap-3">
            <Heart className="h-6 w-6 text-health-accent fill-health-accent" />
            Mes excuses favorites
          </SheetTitle>
        </SheetHeader>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="animate-float mb-4">
              <Heart className="h-16 w-16 text-muted-foreground/20" />
            </div>
            <p className="text-lg font-display font-semibold text-muted-foreground">
              Aucun favori pour l'instant !
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Clique sur le cœur pour sauvegarder tes meilleures excuses
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Tout supprimer
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-180px)] pr-4">
              <div className="space-y-4">
                {favorites.map((favorite, index) => (
                  <div
                    key={favorite.id}
                    className="card-elevated rounded-xl p-4 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border',
                          categoryStyles[favorite.category]
                        )}
                      >
                        {categoryLabels[favorite.category]}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCopy(favorite.text)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          aria-label="Copier"
                        >
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => onRemove(favorite.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                          aria-label="Supprimer"
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed italic">
                      "{favorite.text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Sauvegardé le {new Date(favorite.savedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
