import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, BookOpen, GraduationCap } from 'lucide-react';

interface PersonalizationData {
  name: string;
  assignment: string;
  teacher: string;
}

interface PersonalizationFormProps {
  data: PersonalizationData;
  onChange: (data: PersonalizationData) => void;
}

export function PersonalizationForm({ data, onChange }: PersonalizationFormProps) {
  const handleChange = (field: keyof PersonalizationData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">✏️</span>
        <h3 className="font-display font-semibold text-foreground text-lg">
          Personnalise ton excuse
        </h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          Optionnel
        </span>
      </div>
      
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            Ton prénom
          </Label>
          <Input
            id="name"
            placeholder="Ex: Alex"
            value={data.name}
            onChange={handleChange('name')}
            className="bg-background border-2 border-border focus:border-primary rounded-xl h-11 text-sm placeholder:text-muted-foreground/60"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assignment" className="text-sm font-medium text-foreground flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            Devoir
          </Label>
          <Input
            id="assignment"
            placeholder="Ex: Maths"
            value={data.assignment}
            onChange={handleChange('assignment')}
            className="bg-background border-2 border-border focus:border-primary rounded-xl h-11 text-sm placeholder:text-muted-foreground/60"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="teacher" className="text-sm font-medium text-foreground flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
            Prof
          </Label>
          <Input
            id="teacher"
            placeholder="Ex: M. Dupont"
            value={data.teacher}
            onChange={handleChange('teacher')}
            className="bg-background border-2 border-border focus:border-primary rounded-xl h-11 text-sm placeholder:text-muted-foreground/60"
          />
        </div>
      </div>
    </div>
  );
}
