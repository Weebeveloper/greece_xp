export interface IQuest {
  name: string;
  description: string;
  points: number;
  difficulty: number;
}

export enum QuestDifficulty {
  EASY = 'מיכאל השמיני',
  MEDIUM = 'אריסטוטלוס',
  HARD = 'אלקנסדר',
}

export type QuestStatus = 'active' | 'completed_today' | 'available';

export interface IQuestState {
  status: QuestStatus;
  quest: IQuest | null;
}
