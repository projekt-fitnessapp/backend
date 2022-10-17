const { MongoClient } = require('mongodb');
/*
async function connectAndClear() {
    const client = new MongoClient('mongodb+srv://fynn:test1234@cluster0.ybqjxoi.mongodb.net/?retryWrites=true&w=majority');

    try {
        await client.connect();
        console.log(client);
        const admin = await client.db('admin');

        (await admin.listDatabases()).databases.forEach(async (dba) => {
            if (dba.name != "admin" && db.name != "local") {
                await db.getSiblingDB(dba.name).dropDatabase();
                console.log(`deleted ${dba.name}`)
            }
        })
    } finally {
        await client.close();
    }
}

connectAndClear();
*/

// Connection url
var url = 'mongodb+srv://fynn:test1234@cluster0.ybqjxoi.mongodb.net/?retryWrites=true&w=majority';
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  // Use the admin database for the operation
  var adminDb = db.db('test').admin();
  // List all the available databases
  adminDb.listDatabases(function(err, result) {
    result.databases.forEach(async (dba) => {
        if (dba.name != "admin" && dba.name != "local") {
            console.log(`deleting ${dba.name}`);
            await (await db.db(dba.name)).dropDatabase();
            console.log(`deleted ${dba.name}`)
        }
    });
    db.close();
  });
});