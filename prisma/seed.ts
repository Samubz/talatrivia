import { PrismaClient, ProfileType } from '@prisma/client';
import { ProfilesInfo,AdminUserInfo } from './seedInfo';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Start Seeding Process');
    await prisma.profile.createMany({
      data: ProfilesInfo,
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
    await prisma.user.create({
      data: {
        profileId: adminProfile.id,
        ...AdminUserInfo,
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
