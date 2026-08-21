import { InjectionToken } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createAngularFetchBridge } from "./common/HttpCache.service";
import { environment } from "../../environments/environment.prod";

const supabaseURL = environment.SUPABASE_URL;
const supabaseKey = environment.SUPABASE_KEY;

export const SUPABASE_API = new InjectionToken<SupabaseClient>("SupabaseApi", {
  providedIn: "root",
  factory: () => {
    // Safely execute the fetch bridge factory
    const angularFetch = createAngularFetchBridge();

    return createClient(supabaseURL, supabaseKey, {
      global: {
        fetch: angularFetch,
      },
    });
  },
});
