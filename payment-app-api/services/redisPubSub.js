const Queue = require('bee-queue');
const orderModel = require(__path_models + 'order');
class RedisPubSub {

  constructor(taskQueue, jobQueue) {
    const options = {
      removeOnSuccess: true,
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      }
    }
    // Tasks
    this.registerPubSubQueue = new Queue(taskQueue, options);
    // Jobs
    this.processPubSubQueue = new Queue(jobQueue, options);

    // Listening registerPubSubQueue on succeeded
    // Step 3
    this.processPubSubQueue.process((job, done) => {
      console.log(`Step 3. Done, order changed status`);
      // Notify the client via push notification, web socket or etc.
      done();
    })

    // Listening create a new task
    // Step 1 & Step 2
    this.registerPubSubQueue.process(3, (job, done) => {
      // Step 1 is callback function
      setTimeout(() => console.log("Step 1. Begin process data"), 500);

      // Step 2 also is callback function, but it processes payment status of order
      setTimeout(() => {
        job.data.status = 'delivered'
        orderModel.saveItem(job.data, { "action": "update" });
        console.log(`Step 2. Order data is processing.`)
        done();
      }, 60000);

    })
    // Task notify to job
    this.registerPubSubQueue.on('succeeded', (job, result) => {
      this.processPubSubQueue.createJob(job.data).save();
    })
  }


  // This acts as the task publisher.
  // Register a task
  registerPubSub(PubSub) {
    return this.registerPubSubQueue.createJob(PubSub).save();
  }

  // Get data processing
  getQueueStatus(orderId) {
    return this.registerPubSubQueue.getJob(orderId).then((job) => {
      return {
        progress: job.progress,
        status: job.status,
        order: job.data
      };
    });
  }
}
module.exports = RedisPubSub
