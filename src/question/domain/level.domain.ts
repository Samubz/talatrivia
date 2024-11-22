export const LevelMap = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type LevelDomain =
  (typeof LevelMap)[keyof typeof LevelMap];
