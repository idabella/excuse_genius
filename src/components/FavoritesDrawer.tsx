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
import { FavoriteExcuse } from '@/hooks/useFavorites';
import { categoryLabels, categoryColors } from '@/data/excuses';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FavoritesDrawerProps {
  favorites: FavoriteExcuse[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function FavoritesDrawer({ favorites, onRemove, onClear }: FavoritesDrawerProps) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-2 hover:bg-card fixed bottom-6 right-6 shadow-card z-50"
        >
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          <span className="font-medium">Favorites</span>
          {favorites.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-popover">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-handwritten flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            Saved Excuses
          </SheetTitle>
        </SheetHeader>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg font-handwritten">
              No saved excuses yet!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the heart button to save your favorites
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-180px)] mt-4 pr-4">
              <div className="space-y-4">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="paper-texture rounded-lg p-4 border-2 border-border animate-slide-in"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className={cn(
                          'inline-block px-2 py-0.5 rounded-full text-xs font-medium border',
                          categoryColors[favorite.category]
                        )}
                      >
                        {categoryLabels[favorite.category]}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCopy(favorite.text)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors"
                          aria-label="Copy excuse"
                        >
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => onRemove(favorite.id)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors"
                          aria-label="Remove from favorites"
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      "{favorite.text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Saved {new Date(favorite.savedAt).toLocaleDateString()}
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
