const mongoose = require('mongoose');
const config = require('./config');

const Category = require('./models/Category');
const Item = require('./models/Item');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.dbURL, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }
    const users = await User.create(
        {user: 'leonardo', displayName: 'Leo', phoneNumber: +996775555555},
        {user: 'april', displayName: 'April', phoneNumber: +996775555556},

    );

    const categories = await Category.create(
        {category: 'Automobiles'},
        {category: 'Apartments'},
        {category: 'Clothes'},
        {category: "Kid's world"},
        {category: 'Electronics'}
    );

    await Item.create(
        {item: 'Toyota', price: 5000, description: 'Super fast car. New one, color blue', category: categories[0]._id, image: 'toyota.jpeg', user: users[0]._id},
        {item: 'Dress from H&M', price: 580, description: 'Silky red dress. Ideal for parties', category: categories[2]._id, image: 'dress.jpeg', user: users[1]._id}
    );

    await connection.close();
};


run().catch(error => {
    console.log('Something went wrong', error);
});