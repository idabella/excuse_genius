import { useState, useCallback } from 'react';
import { CategorySelector } from '../components/CategorySelector';
import { PersonalizationForm } from '../components/PersonalizationForm';
import { ExcuseDisplay } from '../components/ExcuseDisplay';
import { GenerateButton } from '../components/GenerateButton';
import { FavoritesDrawer } from '../components/FavoritesDrawer';
import { ScoreTracker } from '../components/ScoreTracker';
import { AchievementNotification, AchievementBadge } from '../components/AchievementBadge';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { useFavorites } from '../hooks/useFavorites';
import { useGameStats } from '../hooks/useGameStats';
import {
  ExcuseCategory,
  getRandomExcuse,
  personalizeExcuse,
} from '../data/excuses';
import { toast } from 'sonner';
import { Gamepad2 } from 'lucide-react';

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
  const [showConfetti, setShowConfetti] = useState(false);

  const { favorites, addFavorite: addFavoriteToList, removeFavorite, isFavorite, clearAllFavorites } =
    useFavorites();

  const { stats, levelName, addExcuse, addFavorite: addFavoriteScore, newAchievements, getAllAchievements } = useGameStats();

  const generateExcuse = useCallback(() => {
    setIsGenerating(true);
    setShowConfetti(false);

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
      setShowConfetti(true);

      // Add to game stats
      addExcuse(result.category, favorites.length);

      toast.success('🎉 +10 points!', {
        description: 'Nouvelle excuse générée !',
      });
    }, 500);
  }, [selectedCategory, personalization, addExcuse, favorites.length]);

  const handleSave = useCallback(() => {
    if (!currentExcuse || !currentCategory) return;

    if (isFavorite(currentExcuse)) {
      const favorite = favorites.find((f) => f.text === currentExcuse);
      if (favorite) {
        removeFavorite(favorite.id);
        toast.info('Retiré des favoris');
      }
    } else {
      addFavoriteToList(currentExcuse, currentCategory);
      addFavoriteScore(favorites.length + 1);
      toast.success('❤️ +5 points!', {
        description: 'Ajouté aux favoris !',
      });
    }
  }, [currentExcuse, currentCategory, isFavorite, favorites, addFavoriteToList, removeFavorite, addFavoriteScore]);

  const handleClearFavorites = useCallback(() => {
    clearAllFavorites();
    toast.info('Tous les favoris ont été supprimés');
  }, [clearAllFavorites]);

  const achievements = getAllAchievements();

  return (
    <div className="min-h-screen pb-24">
      {/* Confetti Effect */}
      <ConfettiEffect trigger={showConfetti} />

      {/* Achievement Notifications */}
      {newAchievements.map((achievement, index) => (
        <AchievementNotification
          key={achievement.id}
          achievement={achievement}
          onClose={() => { }}
        />
      ))}

      {/* Header */}
      <header className="py-6 sm:py-8 px-4 text-center">
        <div className="animate-float inline-block mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg inline-block game-glow">
            <Gamepad2 className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-2">
          <span className="text-gradient">Excuse Quest</span>
        </h1>
        <p className="text-xl sm:text-2xl font-display text-primary font-semibold mb-2">
          🎮 Édition Gaming 🎮
        </p>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
          Génère des excuses et monte de niveau !
          <span className="block mt-1 text-xs opacity-70">(Deviens une légende de l'excuse 😎)</span>
        </p>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 space-y-6">
        {/* Score Tracker */}
        <ScoreTracker
          score={stats.score}
          level={stats.level}
          levelName={levelName}
          totalExcuses={stats.totalExcuses}
          streak={stats.streak}
        />

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
            onCopy={() => { }}
            onSave={handleSave}
            onShare={() => { }}
            onRegenerate={generateExcuse}
          />
        </section>

        {/* Achievements */}
        {achievements.some(a => a.unlocked) && (
          <section className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Succès débloqués
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </section>
        )}
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
          Fait avec 💛 pour les étudiants • Joue et monte de niveau ! 🎮
        </p>
      </footer>
    </div>
  );
};

export default Index;
