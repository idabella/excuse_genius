import { ExcuseCategory, categoryLabels } from '@/data/excuses';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selected: ExcuseCategory | null;
  onSelect: (category: ExcuseCategory | null) => void;
}

const categoryStyles: Record<ExcuseCategory, string> = {
  health: 'hover:bg-red-100 hover:border-red-300 data-[selected=true]:bg-red-100 data-[selected=true]:border-red-400 data-[selected=true]:text-red-700',
  technical: 'hover:bg-blue-100 hover:border-blue-300 data-[selected=true]:bg-blue-100 data-[selected=true]:border-blue-400 data-[selected=true]:text-blue-700',
  family: 'hover:bg-purple-100 hover:border-purple-300 data-[selected=true]:bg-purple-100 data-[selected=true]:border-purple-400 data-[selected=true]:text-purple-700',
  miscellaneous: 'hover:bg-green-100 hover:border-green-300 data-[selected=true]:bg-green-100 data-[selected=true]:border-green-400 data-[selected=true]:text-green-700',
};

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categories: ExcuseCategory[] = ['health', 'technical', 'family', 'miscellaneous'];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">
        Choose a category (or leave empty for random)
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            data-selected={selected === category}
            onClick={() => onSelect(selected === category ? null : category)}
            className={cn(
              'px-4 py-2 rounded-lg border-2 border-border bg-card',
              'font-medium text-sm transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              categoryStyles[category]
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
    </div>
  );
}
