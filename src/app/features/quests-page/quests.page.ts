import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { IQuest, QuestDifficulty } from './quest.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestsApiService } from './api.service';

@Component({
  selector: 'app-quests-overview',
  standalone: true,
  imports: [MatRippleModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './quests.page.html',
  styleUrl: './quests.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsOverview {
  private readonly _api = inject(QuestsApiService);

  protected readonly QuestDifficulty = QuestDifficulty;

  protected readonly quest = resource({
    // TODO PLAYERID
    loader: () => this._api.getCurrentQuest(1),
  });

  async onQuestButton() {
    // TODO PLAYERID
    await this._api.requestQuest(1);
    this.quest.reload();

    if (this.isVibartionSupported()) {
      navigator.vibrate([300, 50, 300, 50, 300, 50, 500]);
    }
  }

  async onFinishQuest() {
    // TODO PLAYERID
    await this._api.completeQuest(1);
    this.quest.reload();
  }

  private isVibartionSupported(): boolean {
    return typeof window !== 'undefined' && 'vibrate' in navigator;
  }
}
