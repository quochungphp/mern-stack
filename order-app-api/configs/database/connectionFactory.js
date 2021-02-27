import mongo from './instanceMongoose.js'

export default class connectionFactory {
  static mongo;
  static postgre;
  static redis;

  static get Mongo() {
    if (!connectionFactory.mongo) {
      connectionFactory.mongo = mongo;
    }
    return connectionFactory.mongo;
  }
  static Postgre() {
    // Todo list
  }

  static get Redis() {
    // Todo list
  }
}
