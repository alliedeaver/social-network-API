const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the thought if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'Thought' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('Thought');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'User' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const Thought = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      Thought,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(Thought);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

