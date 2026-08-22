import { inject, Injectable } from '@angular/core';
import { SUPABASE_API } from '../../supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';
import { IQuest, IQuestState } from './quest.interface';

@Injectable()
export class QuestsApiService {
  private readonly _api: SupabaseClient = inject(SUPABASE_API);

  async completeQuest(playerId: number): Promise<void> {
    const { error } = await this._api.rpc('complete_quest', { p_player_id: playerId });
    if (error) throw error;
  }

  async getCurrentQuest(playerId: number): Promise<IQuestState> {
    const { data, error } = await this._api
      .from('player_quest')
      .select('assigned_quest, assigned_at, quests(*)')
      .eq('player_id', playerId)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      const questRow = Array.isArray(data.quests) ? data.quests[0] : data.quests;
      if (questRow) {
        const quest: IQuest = {
          name: questRow.quest_name,
          description: questRow.quest_description,
          difficulty: questRow.difficulty,
          points: questRow.points,
        };
        return { status: 'active', quest };
      }
    }

    // no active quest — check if they already completed one this cycle
    const { data: completedToday, error: completedError } = await this._api.rpc(
      'has_completed_this_cycle',
      { p_player_id: playerId },
    );

    if (completedError) throw completedError;

    return {
      status: completedToday ? 'completed_today' : 'available',
      quest: null,
    };
  }

  async requestQuest(playerId: number): Promise<IQuest> {
    const { data, error } = await this._api.rpc('assign_quest', { p_player_id: playerId });
    if (error) throw error;

    return {
      name: data.quest_name,
      description: data.quest_description,
      difficulty: data.difficulty,
      points: data.points,
    } satisfies IQuest;
  }
}
