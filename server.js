const app = require('./app')
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://tati:**XEbKkmdvc4gPn@cluster0.6tfwxy5.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


