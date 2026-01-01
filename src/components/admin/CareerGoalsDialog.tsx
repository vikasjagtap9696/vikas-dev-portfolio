import { useState } from "react";
import { Target, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProfileSettings, useUpdateProfileSettings } from "@/hooks/useProfileSettings";
import { toast } from "sonner";

const DEFAULT_GOALS = [
  "Become an industry-ready all-round developer",
  "Build products that solve real-world problems",
  "Contribute to impactful software solutions",
  "Continuously improve through real-world projects",
];

export function CareerGoalsDialog() {
  const [open, setOpen] = useState(false);
  
  const { data: settings } = useProfileSettings();
  const updateSettings = useUpdateProfileSettings();

  const [goals, setGoals] = useState<string[]>([]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && settings) {
      setGoals(settings.career_goals || DEFAULT_GOALS);
    }
    setOpen(isOpen);
  };

  const handleAddGoal = () => {
    setGoals([...goals, ""]);
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleUpdateGoal = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const handleSave = async () => {
    if (!settings) return;
    
    const filteredGoals = goals.filter(g => g.trim() !== "");
    
    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        career_goals: filteredGoals.length > 0 ? filteredGoals : null,
      });
      toast.success("Career goals updated!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update career goals");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Target className="h-4 w-4 mr-2" />
          Goals
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Career Goals</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Enter a career goal..."
                value={goal}
                onChange={(e) => handleUpdateGoal(index, e.target.value)}
                maxLength={200}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveGoal(index)}
                className="shrink-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            variant="outline"
            onClick={handleAddGoal}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
          
          <Button 
            onClick={handleSave} 
            disabled={updateSettings.isPending}
            className="mt-2"
          >
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
