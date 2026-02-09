export const MEMORIAL_STORAGE_KEYS = {
  HUMAN: 'memorial_draft_human',
  FURRY: 'memorial_draft_furry',
};

export const saveMemorialDraft = (type: 'human' | 'furry', data: any) => {
  if (typeof window === 'undefined') return;
  const key = type === 'human' ? MEMORIAL_STORAGE_KEYS.HUMAN : MEMORIAL_STORAGE_KEYS.FURRY;
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getMemorialDraft = (type: 'human' | 'furry') => {
  if (typeof window === 'undefined') return null;
  const key = type === 'human' ? MEMORIAL_STORAGE_KEYS.HUMAN : MEMORIAL_STORAGE_KEYS.FURRY;
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const clearMemorialDraft = (type: 'human' | 'furry') => {
  if (typeof window === 'undefined') return;
  const key = type === 'human' ? MEMORIAL_STORAGE_KEYS.HUMAN : MEMORIAL_STORAGE_KEYS.FURRY;
  sessionStorage.removeItem(key);
};

export const hasMemorialDraft = (type: 'human' | 'furry') => {
  if (typeof window === 'undefined') return false;
  const key = type === 'human' ? MEMORIAL_STORAGE_KEYS.HUMAN : MEMORIAL_STORAGE_KEYS.FURRY;
  return !!sessionStorage.getItem(key);
};
