export interface IQuest {
  name: string;
  description: string;
  points: number;
  difficulty: QuestDifficulty;
}

export enum QuestDifficulty {
  EASY = 'מיכאל השמיני',
  MEDIUM = 'אריסטוטלוס',
  HARD = 'קונסטנטין',
}
