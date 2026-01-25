import { ExcuseCategory, categoryLabels } from '@/data/excuses';
import { cn } from '@/lib/utils';
import { Stethoscope, Laptop, Users, Sparkles } from 'lucide-react';

interface CategorySelectorProps {
  selected: ExcuseCategory | null;
  onSelect: (category: ExcuseCategory | null) => void;
}

const categoryConfig: Record<ExcuseCategory, { 
  icon: React.ReactNode;
  emoji: string;
  bgClass: string;
  selectedClass: string;
}> = {
  health: {
    icon: <Stethoscope className="h-4 w-4" />,
    emoji: '🤒',
    bgClass: 'hover:bg-health hover:border-health-accent/30',
    selectedClass: 'bg-health border-health-accent/40 text-health-accent shadow-sm',
  },
  technical: {
    icon: <Laptop className="h-4 w-4" />,
    emoji: '💻',
    bgClass: 'hover:bg-technical hover:border-technical-accent/30',
    selectedClass: 'bg-technical border-technical-accent/40 text-technical-accent shadow-sm',
  },
  family: {
    icon: <Users className="h-4 w-4" />,
    emoji: '👨‍👩‍👧',
    bgClass: 'hover:bg-family hover:border-family-accent/30',
    selectedClass: 'bg-family border-family-accent/40 text-family-accent shadow-sm',
  },
  miscellaneous: {
    icon: <Sparkles className="h-4 w-4" />,
    emoji: '🎲',
    bgClass: 'hover:bg-misc hover:border-misc-accent/30',
    selectedClass: 'bg-misc border-misc-accent/40 text-misc-accent shadow-sm',
  },
};

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categories: ExcuseCategory[] = ['health', 'technical', 'family', 'miscellaneous'];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📂</span>
        <h3 className="font-display font-semibold text-foreground text-lg">
          Catégorie d'excuse
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Choisis une catégorie ou laisse vide pour une excuse aléatoire
      </p>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
        {categories.map((category) => {
          const config = categoryConfig[category];
          const isSelected = selected === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelect(isSelected ? null : category)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-transparent',
                'font-medium text-sm transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'bg-card text-muted-foreground',
                config.bgClass,
                isSelected && config.selectedClass,
                isSelected && 'scale-[1.02]'
              )}
            >
              <span className="text-lg">{config.emoji}</span>
              <span className="hidden sm:inline">{categoryLabels[category].replace(/^[^\s]+\s/, '')}</span>
              <span className="sm:hidden text-xs">{categoryLabels[category].replace(/^[^\s]+\s/, '')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
