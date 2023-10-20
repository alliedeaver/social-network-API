const users = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Allie',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Grace',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughtDescriptions = [
    'How did you do that?',
    'Do you like Disneyland?',
    'I love star wars',
    'I cant wait!',
    'Pizza is the best',
    'I know how to do a cartwheel',
    'Favorite movie?',
    'Hey!',
    'I love instagram',
    'School is the best',
    'Take a look at your texts',
    'Whats your email',
    'Can you help me?',
    'I love the internet',
    'DO you know how to cook?',
    'I love diet coke',
    'Las Vegas is my home',
    'Uber eatsss!!!',
];

const PossibleReactions = [
    'WOW',
    'Nice work!',
    'Wanna be friends?',
    'How are you doing?',
    'SO cool',
    'Look at you!',
    'oh my gooness!',
    'Awesome!',
    'Did it work?',
    'Youre so cool',
    'Lets hang out!',
];

const User = [];

// Get a random user given an array
const getRandomUser = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user
const getArrUser = () =>
    `${getRandomUser(users)} ${getArrUser(users)}`;


const getRandomArrUser = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            // published: Math.random() < 0.5,
            description: getRandomUser(thoughtDescriptions),
            // buildSuccess: Math.random() < 0.5,
            reactions: [...getRandomArrUser(3)],
        });
    }
    return results;
};

// Create the tags that will be added to each application
const getPossibleReactions = (int) => {
    if (int === 1) {
        return getRandomArrItem(PossibleReactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(PossibleReactions),
            username: getPossibleReactions(),
        });
    }
    return results;
};


// Export the functions for use in seed.js
module.exports = { getRandomUser, getArrUser, getPossibleReactions };