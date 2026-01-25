import { useState, useCallback } from 'react';
import { CategorySelector } from '@/components/CategorySelector';
import { PersonalizationForm } from '@/components/PersonalizationForm';
import { ExcuseDisplay } from '@/components/ExcuseDisplay';
import { GenerateButton } from '@/components/GenerateButton';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { useFavorites } from '@/hooks/useFavorites';
import {
  ExcuseCategory,
  getRandomExcuse,
  personalizeExcuse,
} from '@/data/excuses';
import { toast } from 'sonner';

interface PersonalizationData {
  name: string;
  assignment: string;
  teacher: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExcuseCategory | null>(null);
  const [personalization, setPersonalization] = useState<PersonalizationData>({
    name: '',
    assignment: '',
    teacher: '',
  });
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<ExcuseCategory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { favorites, addFavorite, removeFavorite, isFavorite, clearAllFavorites } =
    useFavorites();

  const generateExcuse = useCallback(() => {
    setIsGenerating(true);

    // Simulate a brief delay for effect
    setTimeout(() => {
      const result = getRandomExcuse(selectedCategory || undefined);
      const personalized = personalizeExcuse(
        result.excuse,
        personalization.name,
        personalization.assignment,
        personalization.teacher
      );

      setCurrentExcuse(personalized);
      setCurrentCategory(result.category);
      setIsGenerating(false);
    }, 300);
  }, [selectedCategory, personalization]);

  const handleSave = useCallback(() => {
    if (!currentExcuse || !currentCategory) return;

    if (isFavorite(currentExcuse)) {
      const favorite = favorites.find((f) => f.text === currentExcuse);
      if (favorite) {
        removeFavorite(favorite.id);
        toast.info('Removed from favorites');
      }
    } else {
      addFavorite(currentExcuse, currentCategory);
      toast.success('Saved to favorites!', {
        description: 'Find it in your favorites drawer',
      });
    }
  }, [currentExcuse, currentCategory, isFavorite, favorites, addFavorite, removeFavorite]);

  const handleClearFavorites = useCallback(() => {
    clearAllFavorites();
    toast.info('All favorites cleared');
  }, [clearAllFavorites]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 sm:py-12 px-4 text-center">
        <div className="animate-bounce-subtle inline-block mb-4">
          <span className="text-5xl">📚</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-handwritten text-foreground mb-2">
          Homework Excuse Generator
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground font-handwritten">
          ✨ Student Edition ✨
        </p>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Generate believable academic excuses for those "oops" moments. 
          <span className="text-xs block mt-1">(Use responsibly... or not 😏)</span>
        </p>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 pb-24">
        <div className="space-y-8">
          {/* Category Selection */}
          <section className="bg-card rounded-2xl p-6 shadow-paper border-2 border-border">
            <CategorySelector
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </section>

          {/* Personalization Form */}
          <section className="bg-card rounded-2xl p-6 shadow-paper border-2 border-border">
            <PersonalizationForm
              data={personalization}
              onChange={setPersonalization}
            />
          </section>

          {/* Generate Button */}
          <div className="flex justify-center py-4">
            <GenerateButton onClick={generateExcuse} isGenerating={isGenerating} />
          </div>

          {/* Excuse Display */}
          <section>
            <ExcuseDisplay
              excuse={currentExcuse}
              category={currentCategory}
              isFavorite={currentExcuse ? isFavorite(currentExcuse) : false}
              onCopy={() => {}}
              onSave={handleSave}
              onShare={() => {}}
              onRegenerate={generateExcuse}
            />
          </section>
        </div>
      </main>

      {/* Favorites Drawer */}
      <FavoritesDrawer
        favorites={favorites}
        onRemove={removeFavorite}
        onClear={handleClearFavorites}
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 bg-background/80 backdrop-blur-sm border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          Made with 💛 for students everywhere • Use at your own risk! 
        </p>
      </footer>
    </div>
  );
};

export default Index;
