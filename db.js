import mongoose from 'mongoose';

const {
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  firstAttemptReconnectInterval: 5000,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

(function connectWithRetry() {
  mongoose.connect(url, options).then(
    () => console.log('MongoDB is connected'),
    (err) => {
      console.log(`MongoDB connection error: ${err}`);
      setTimeout(connectWithRetry, options.firstAttemptReconnectInterval);
    },
  );
}());

export default mongoose;
