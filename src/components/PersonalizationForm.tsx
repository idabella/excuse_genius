import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-4">
      <h3 className="text-lg font-handwritten text-foreground">
        ✏️ Personalize your excuse (optional)
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-muted-foreground">
            Your Name
          </Label>
          <Input
            id="name"
            placeholder="e.g., Alex"
            value={data.name}
            onChange={handleChange('name')}
            className="bg-card border-2 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignment" className="text-sm text-muted-foreground">
            Assignment Name
          </Label>
          <Input
            id="assignment"
            placeholder="e.g., Math homework"
            value={data.assignment}
            onChange={handleChange('assignment')}
            className="bg-card border-2 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher" className="text-sm text-muted-foreground">
            Teacher's Name
          </Label>
          <Input
            id="teacher"
            placeholder="e.g., Mr. Smith"
            value={data.teacher}
            onChange={handleChange('teacher')}
            className="bg-card border-2 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
