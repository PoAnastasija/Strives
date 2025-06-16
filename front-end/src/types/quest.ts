export interface DailyQuest {
  day: number;
  description: string;
  completed: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  days: number;
  tasks: DailyQuest[];
  completed: boolean;
}
