import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { IQuest, QuestDifficulty } from './quest.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quests-overview',
  standalone: true,
  imports: [MatRippleModule, MatButtonModule],
  templateUrl: './quests.page.html',
  styleUrl: './quests.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsOverview {
  protected readonly quest = signal<IQuest | null>(null);

  onQuestButton(): void {
    this.quest.set(this.getQuest());

    if (this.isVibartionSupported()) {
      navigator.vibrate([300, 50, 300, 50, 300, 50, 500]);
    }
  }

  onFinishQuest() {}

  private getQuest(): IQuest {
    return {
      name: 'משימה חדשה',
      description:
        'ה משימה על מר גב משימה על מר גב משימה על מר גב משימה על מר גב משימה על מר גב משימה על מר גב',
      difficulty: QuestDifficulty.MEDIUM,
      points: 2,
    } satisfies IQuest;
  }

  private isVibartionSupported(): boolean {
    return typeof window !== 'undefined' && 'vibrate' in navigator;
  }
}
