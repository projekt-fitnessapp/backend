import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

export class TestDatabase {
    private dbName: string | null = null;

    public async initialize() {
        if (this.dbName) {
            throw new Error("Please cleanup your testdb before using it again");
        }

        this.dbName = uuidv4();
        await mongoose.connect(`mongodb+srv://fynn:test1234@cluster0.ybqjxoi.mongodb.net/${this.dbName}?retryWrites=true&w=majority`);
    }

    public async cleanup() {
        if (!this.dbName) {
            throw new Error("Your Testdatabse is not initialized yet");
        }
        const dbName = this.dbName

        mongoose.disconnect()

        // Connection url
        const url = 'mongodb+srv://fynn:test1234@cluster0.ybqjxoi.mongodb.net/?retryWrites=true&w=majority';
        // Connect using MongoClient
        MongoClient.connect(url, function (_err, db) {
            if(!db) return
            
            // Use the admin database for the operation
            const adminDb = db.db('test').admin();
            // List all the available databases
            adminDb.listDatabases(async function (_err, result) {
                if(!result) return
                await Promise.all(result.databases.map(async (dba) => {
                    if (dba.name == dbName) {
                        await (await db.db(dba.name)).dropDatabase();
                    }
                }));
                db.close();
            });
        });

        this.dbName = null;
    }
}