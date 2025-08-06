// scripts/cleanEmptyMessages.mjs
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "chatlogs";
const collectionName = "messages";

async function cleanEmptyMessages() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("🔗 Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Находим сообщения с пустым контентом
    const emptyMessages = await collection
      .find({
        $or: [
          { content: null },
          { content: "" },
          { content: { $regex: /^\s*$/ } }, // Только пробелы
          { content: { $exists: false } },
        ],
      })
      .toArray();

    console.log(`📊 Found ${emptyMessages.length} messages with empty content`);

    if (emptyMessages.length > 0) {
      // Удаляем сообщения с пустым контентом
      const result = await collection.deleteMany({
        $or: [
          { content: null },
          { content: "" },
          { content: { $regex: /^\s*$/ } },
          { content: { $exists: false } },
        ],
      });

      console.log(
        `✅ Deleted ${result.deletedCount} messages with empty content`
      );
    } else {
      console.log("✅ No empty messages found");
    }
  } catch (error) {
    console.error("❌ Error cleaning empty messages:", error);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Запускаем скрипт
cleanEmptyMessages();
