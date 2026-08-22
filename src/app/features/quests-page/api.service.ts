import { inject, Injectable } from '@angular/core';
import { SUPABASE_API } from '../../supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';
import { IQuest } from './quest.interface';

@Injectable()
export class QuestsApiService {
  private readonly _api: SupabaseClient = inject(SUPABASE_API);

  async completeQuest(playerId: number): Promise<void> {
    const { error } = await this._api.rpc('complete_quest', { p_player_id: playerId });
    if (error) throw error;
  }

  async getCurrentQuest(playerId: number): Promise<IQuest | null> {
  const { data, error } = await this._api
    .from('player_quest')
    .select('assigned_quest, assigned_at, quests(*)')
    .eq('player_id', playerId)
    .maybeSingle();  // returns null instead of throwing if no row exists

    if (error) throw error;
    if (!data) return null;

      const quest = Array.isArray(data.quests) ? data.quests[0] : data.quests;
      if (!quest) return null;

      return {
        name: quest.quest_name,
        description: quest.quest_description,
        difficulty: quest.difficulty,
        points: quest.points
      } satisfies IQuest;
  }

  async requestQuest(playerId: number): Promise<IQuest> {
    const { data, error } = await this._api.rpc('assign_quest', { p_player_id: playerId });
    if (error) throw error;

    return ({
      name: data.quest_name,
      description: data.quest_description,
      difficulty: data.difficulty,
      points: data.points
    } satisfies IQuest);
  }
}
