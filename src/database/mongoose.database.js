const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.s2olvjg.mongodb.net/?retryWrites=true&w=majority&appName=FscTaskManagerCluster`
        );
    } catch (error) {
        console.log(`Could not connect to MongoDB: ${error.message}`);
    } finally {
        console.log('Connected to MongoDB Database!');
    }
};

module.exports = connectToDatabase;
