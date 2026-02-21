import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lefvquggwooeenivqszh.supabase.co';
const supabaseAnonKey = 'sb_publishable_ocDn1ZIar0__Fhz2uNPv-g_IiVYx-bd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
