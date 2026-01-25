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
import { BookOpen } from 'lucide-react';

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
    }, 500);
  }, [selectedCategory, personalization]);

  const handleSave = useCallback(() => {
    if (!currentExcuse || !currentCategory) return;

    if (isFavorite(currentExcuse)) {
      const favorite = favorites.find((f) => f.text === currentExcuse);
      if (favorite) {
        removeFavorite(favorite.id);
        toast.info('Retiré des favoris');
      }
    } else {
      addFavorite(currentExcuse, currentCategory);
      toast.success('Ajouté aux favoris ! ❤️', {
        description: 'Retrouve-le dans tes favoris',
      });
    }
  }, [currentExcuse, currentCategory, isFavorite, favorites, addFavorite, removeFavorite]);

  const handleClearFavorites = useCallback(() => {
    clearAllFavorites();
    toast.info('Tous les favoris ont été supprimés');
  }, [clearAllFavorites]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="py-10 sm:py-14 px-4 text-center">
        <div className="animate-float inline-block mb-4">
          <div className="bg-card p-4 rounded-2xl shadow-card inline-block">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-3">
          Générateur d'Excuses
        </h1>
        <p className="text-xl sm:text-2xl font-display text-primary font-semibold mb-4">
          ✨ Édition Étudiante ✨
        </p>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
          Génère des excuses crédibles pour tes devoirs en retard. 
          <span className="block mt-1 text-xs opacity-70">(À utiliser avec modération... ou pas 😏)</span>
        </p>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 space-y-6">
        {/* Category Selection */}
        <section className="card-elevated rounded-2xl p-6 animate-fade-in">
          <CategorySelector
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Personalization Form */}
        <section className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <PersonalizationForm
            data={personalization}
            onChange={setPersonalization}
          />
        </section>

        {/* Generate Button */}
        <div className="flex justify-center py-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <GenerateButton onClick={generateExcuse} isGenerating={isGenerating} />
        </div>

        {/* Excuse Display */}
        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
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
      </main>

      {/* Favorites Drawer */}
      <FavoritesDrawer
        favorites={favorites}
        onRemove={removeFavorite}
        onClear={handleClearFavorites}
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 bg-background/80 backdrop-blur-md border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          Fait avec 💛 pour les étudiants • À utiliser à tes risques et périls ! 
        </p>
      </footer>
    </div>
  );
};

export default Index;
