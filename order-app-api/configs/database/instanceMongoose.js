import mongoose from 'mongoose';
const databaseConfig = require('../../configs/collectionSchemas');

export default function getMongo() {
  const stringConnect = `mongodb+srv://${databaseConfig.db_user}:${databaseConfig.db_password}@cluster0-z9sry.mongodb.net/${databaseConfig.db_database}?retryWrites=true&w=majority`;

  mongoose
    .connect(stringConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) =>{
      console.log('DB Connected!')
      // console.log(result)
    })
    .catch(err => {
      console.log('DB Connection Error');
      console.log(err);
    });

  const db = mongoose.connection;

  return db;
}
