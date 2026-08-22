import { inject, Injectable } from '@angular/core';
import { SUPABASE_API } from '../../supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';
import { IUserScore } from './interfaces';

@Injectable()
export class StandingsApiService {
  private readonly _api: SupabaseClient = inject(SUPABASE_API);

  async getAllUsersScore(): Promise<IUserScore[]> {
    const results = await this._api.from('scoreboard').select('*').order('player_score');

    const mappedResults = results.data?.map(
      (value) =>
        ({
          name: value.player_name,
          score: value.player_score,
        }) satisfies IUserScore,
    );
    return mappedResults ?? [];
  }
}
