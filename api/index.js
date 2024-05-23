require("dotenv").config();

// ----------------------[Imports]----------------------
const express = require("express");
const app = express();
const port = process.env.PORT;
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

const cors = require("cors");
const fs = require("fs");
const path = require("path");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(chalk.magenta("Connected to Database")));

const uploadFolder = "./public";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json({ limit: "100mb" }));
const morganConfiguration = require("./middlewares/morgan");
app.use(morganConfiguration());

const admin = require("./routes/Admin");
const user = require("./routes/Users");
const vehicles = require("./routes/Vehicles");
const manufacturers = require("./routes/Manufacturer");
const subscription = require("./routes/Subscription");
const payments = require("./routes/Payments");
const feedback = require("./routes/Feedback");
const chalk = require("chalk");
const running_text = require("./routes/RunningText");

app.use("/api/admin", admin);
app.use("/api/user", user);
app.use("/api/vehicles", vehicles);
app.use("/api/manufacturer", manufacturers);
app.use("/api/subscription", subscription);
app.use("/api/payment", payments);
app.use("/api/feedbacks", feedback);
app.use("/api/running-text", running_text);

const server = http.createServer(app);
const io = socketIo(server);
const USER = require("./models/User");
io.of("/socket").on("connection", async (socket) => {
  socket.on("login_status", async (data) => {
    const query = {
      userID: data.userID,
    };
    const datax = {
      $set: {
        deviceID: data.deviceID,
      },
    };
    const user = await USER.find(query).limit(1);

    await USER.updateOne(query, datax);

    io.of("/socket").emit("login_status", {
      deviceID: data.deviceID,
      userID: data.userID,
    });
    // if (user.deviceID == data.deviceID) {
    //   io.of("/socket").emit("login_status", [
    //     { deviceID: data.deviceID },
    //     { userID: user.userID },
    //   ]);
    // } else {
    //   io.of("/socket").emit("login_status", [
    //     { deviceID: data.deviceID },
    //     { userID: user.userID },
    //   ]);
    // }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(chalk.magenta(`Express server listening on port ${port}`));
});