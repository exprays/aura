const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous Peoples" },
                { name: "Movies & TV" },
                { name: "Sportsmen" },
                { name: "Animals" },
                { name: "Philosophers" },
                { name: "Scientists" },
            ]
        })
    } catch (error) {
        console.log("Error while seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
};

main();