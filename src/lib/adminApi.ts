const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface AdminApiOptions {
  action: 'insert' | 'update' | 'delete';
  table: 'projects' | 'skills';
  data?: Record<string, unknown>;
  id?: string;
}

export async function adminApi(options: AdminApiOptions, password: string) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': password,
    },
    body: JSON.stringify(options),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Admin API request failed');
  }

  return result.data;
}
