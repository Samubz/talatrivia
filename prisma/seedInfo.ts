import { ProfileType, Profile, Permissions, User } from '@prisma/client';

export const ProfilesInfo: Omit<Profile, 'id'>[] = [
  {
    type: ProfileType.ADMIN,
    name: ProfileType.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    permissions: [
      Permissions.GET_TRIVIA,
      Permissions.LIST_TRIVIA,
      Permissions.CREATE_TRIVIA,
      Permissions.DELETE_TRIVIA,
      Permissions.GET_QUESTION,
      Permissions.LIST_QUESTIONS,
      Permissions.CREATE_QUESTION,
      Permissions.DELETE_QUESTION,
      Permissions.ASSIGN_USER_TRIVIA,
      Permissions.CREATE_USER,
      Permissions.GET_TRIVIA_RANKING,
      Permissions.GET_TRIVIA_SCORE,
      Permissions.ANSWER_TRIVIA,
    ],
  },
  {
    type: ProfileType.PLAYER,
    name: ProfileType.PLAYER,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    permissions: [
      Permissions.GET_TRIVIA,
      Permissions.GET_QUESTION,
      Permissions.LIST_QUESTIONS,
      Permissions.ANSWER_TRIVIA,
    ],
  },
];
export const AdminUserInfo: Omit<User, 'id' | 'profileId'> = {
  email: 'admin@email.com',
  name: 'Admin User',
  password: '85b5fb13c2a6ac113e0e54730b78e52b60ba6c72838002636106dcbcd38a6554',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};