import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export class TestDatabase {
    private dbName: string | null = null;

    public async initialize() {
        if(this.dbName) {
            throw new Error("Please cleanup your testdb before using it again");
        }

        this.dbName = uuidv4();
        await mongoose.connect(`mongodb+srv://fynn:test1234@cluster0.ybqjxoi.mongodb.net/${this.dbName}?retryWrites=true&w=majority`);
    }

    public async cleanup() {
        if(!this.dbName) {
            throw new Error("Your Testdatabse is not initialized yet");
        }

        (await mongoose.connection.getClient().db(this.dbName)).dropDatabase();
        await mongoose.disconnect();

        this.dbName = null;
    }
}