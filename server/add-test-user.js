const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth";

console.log('Adding test user to MongoDB...');

async function addTestUser() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const database = client.db('heth');
    const users = database.collection('user');

    // Hash a password (simple for testing)
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('testpassword', 12);

    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      age: 25,
      tokenVersion: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await users.insertOne(testUser);
    console.log('✅ Test user added with ID:', result.insertedId);

    // Verify the user was added
    const user = await users.findOne({ email: 'test@example.com' });
    console.log('✅ User found in database:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

addTestUser();
