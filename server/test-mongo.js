const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth";

console.log('Testing MongoDB connection...');

MongoClient.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
  .then(client => {
    console.log('✅ Connected to MongoDB successfully!');
    client.close();
  })
  .catch(err => {
    console.error('❌ Failed to connect:', err.message);
  });
