export const ProfileTypeMap = {
  ADMIN: 'ADMIN',
  PLAYER: 'PLAYER',
} as const;

export type ProfileTypeDomain =
  (typeof ProfileTypeMap)[keyof typeof ProfileTypeMap];
