const { MongoClient, ObjectId } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const client = new MongoClient(connectionURL, {
  useNewUrlParser: true,
});

client
  .connect()
  .then((response) => {
    console.log("Connected to database!");

    const db = client.db(databaseName);

    //to insert one

    // db.collection("tasks")
    //   .insertOne({
    //     description: "this is a description5",
    //     completed: false,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // to insert many

    // db.collection("tasks")
    //   .insertMany([
    //     {
    //       description: "this is a description5",
    //       completed: true,
    //     },
    //     {
    //       description: "this is a description6",
    //       completed: true,
    //     },
    //     {
    //       description: "this is a description7",
    //       completed: false,
    //     },
    //   ])
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to findOne

    // db.collection("tasks")
    //   .findOne({ _id: new ObjectId("64e9d04a29b6363171b84447") })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to findAll

    //Method #1
    // db.collection("users")
    //   .find({ age: { $gt: 23 } })
    //   .forEach((element) => {
    //     console.log(element);
    //   });

    //Method #2
    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray()
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to update one

    // db.collection("tasks")
    //   .updateOne(
    //     { _id: new ObjectId("64e9a71de424643812257f54") },
    //     {
    //       $set: {
    //         completed: false,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to update all

    // db.collection("tasks")
    //   .updateMany({ completed: false }, { $set: { completed: true } })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to delete one

    // db.collection("tasks")
    //   .deleteOne({ _id: new ObjectId("64e9a71de424643812257f55") })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //to delete all

    // db.collection("tasks")
    //   .deleteMany({ completed: false })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  })

  .catch((error) => {
    console.log("Unable to connect to database!");
  });
