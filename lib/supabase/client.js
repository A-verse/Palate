import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url' || supabaseKey === 'your_supabase_anon_key') {
    return createBrowserClient('https://dummy.supabase.co', 'dummy-key')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}