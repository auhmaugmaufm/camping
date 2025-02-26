import { db } from "@/utils/db";

const testDB = async () => {
  try {
    const profiles = await db.profile.findMany();
    console.log(profiles);
  } catch (error) {
    console.error("DB Error:", error);
  }
};

testDB();
