const express = require("express");
const config = require("config");
const db = require("./config/db.js");
const Mainroutes = require("./routes/index.routes");
const errorHandler = require("./middleware/errorHandler.js");


const app = express();
const PORT = config.get("port") || 5000;

app.use(express.json()); 
app.use("/api", Mainroutes);


db.connectDB(); 

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
});
