import { PrismaClient, ProfileType } from '@prisma/client';
import { ProfilesInfo, AdminUserInfo, QuestionLevelInfo } from './seedInfo';
import { PASSWORD_SALT_BCRYPT } from '../src/auth/constants/bcrypt.constants';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Start Seeding Process');
    await prisma.profile.createMany({
      data: ProfilesInfo,
      skipDuplicates: true,
    });
    await prisma.questionLevel.createMany({
      data: QuestionLevelInfo,
      skipDuplicates: true,
    });


    const adminProfile = await prisma.profile.findFirst({
        where:{
            type:ProfileType.ADMIN
        }
    })
    if(!adminProfile){
        throw new Error("Admin user not found")
    }

    const hashPassword = await bcrypt.hash(
      AdminUserInfo.password,
      PASSWORD_SALT_BCRYPT,
    );
    await prisma.user.create({
      data: {
        profileId: adminProfile.id,
        ...AdminUserInfo,
        password: hashPassword,
      },
    });

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
