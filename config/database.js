const mongoose = require('mongoose');
const connection_String = 'mongodb://127.0.0.1:27017/GamingTeam';

module.exports = async (app) => {
    try {
        await mongoose.connect(connection_String,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('Database is connecting');
    } catch (err) {
        console.log(err.message);
        process.exit('1');
    }

}