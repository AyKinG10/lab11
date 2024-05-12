const mongoose = require("mongoose");

mongoose.connect(

    "mongodb+srv://Yernur:Yernur04@index.ce76hia.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error.message);
  process.exit(1);
});

const db = mongoose.connection;
