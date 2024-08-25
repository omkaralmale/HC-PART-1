import app from "./app.js";
import { DB_connect } from "./db/index.js";

DB_connect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("app listen on", process.env.PORT || 4000);
    });
    app.on("error", (event) => {
      console.log("Error:", event);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });
