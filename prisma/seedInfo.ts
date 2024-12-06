import { ProfileType, Profile, Permissions, User, QuestionLevel, Difficulty } from '@prisma/client';

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
      Permissions.LIST_USERS,
      Permissions.LIST_TRIVIA_USER,
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
      Permissions.LIST_TRIVIA_USER,
    ],
  },
];



export const QuestionLevelInfo: Omit<QuestionLevel, 'id'>[] = [
  {
    difficulty: Difficulty.HARD,
    score: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    difficulty: Difficulty.MEDIUM,
    score: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    difficulty: Difficulty.EASY,
    score: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
export const AdminUserInfo: Omit<User, 'id' | 'profileId'> = {
  email: 'admin@email.com',
  name: 'Admin User',
  password: 'Password-Admin1',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
