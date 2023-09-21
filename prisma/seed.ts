const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 10; i++) {
    // User テーブルにデータを追加
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        image: `http://example.com/user${i}.jpg`,
        password: `password${i}`,
        role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "JobSeeker" : "Recruiter",
        ruby: `UserRuby${i}`,
        birthday: `2000-01-${String(i).padStart(2, "0")}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        address: `Address ${i}`,
        tel: `1234567890${i}`,
        graduation: `Graduated from University ${i}`,
        spouse: Boolean(i % 2 === 0),
      },
    });

    // Company テーブルにデータを追加
    const company = await prisma.company.create({
      data: {
        name: `Company ${i}`,
        description: `This is a description for company ${i}.`,
        logo: `http://example.com/company${i}.logo.jpg`,
        website: `http://company${i}.com`,
        contactEmail: `contact@company${i}.com`,
        recruiterId: user.id,
      },
    });

    // Job テーブルにデータを追加
    const job = await prisma.job.create({
      data: {
        title: `Job Title ${i}`,
        industry: "Service",
        description: `This is a description for job ${i}.`,
        location: `Location ${i}`,
        region: "Ichihara",
        type: "FullTime",
        imageUrl: `http://example.com/job${i}.jpg`,
        companyId: company.id,
      },
    });

    // Application テーブルにデータを追加
    await prisma.application.create({
      data: {
        userId: user.id,
        jobId: job.id,
        status: "InProgress",
      },
    });

    // Article テーブルにデータを追加
    const article = await prisma.article.create({
      data: {
        title: `Article Title ${i}`,
        content: `This is the content for article ${i}.`,
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // FavoriteJob テーブルにデータを追加
    if (i % 2 === 0) {
      await prisma.favoriteJob.create({
        data: {
          userId: user.id,
          jobId: job.id,
        },
      });
    }

    // Scout テーブルにデータを追加
    if (user.role === "Recruiter") {
      await prisma.scout.create({
        data: {
          recruiterId: user.id,
          userId: i + 1 > 10 ? 1 : i + 1, // just for example, making sure the user exists
          message: `Hey User ${i + 1}, we're interested in hiring you!`,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
