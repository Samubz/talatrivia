export class UserDomain {
  id: string;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  profileId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}