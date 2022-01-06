import express from "express";
import IndexRouter from "./routes/index.js";

let app = express();

app.use("/", IndexRouter);

app.listen(3000, () => {
  console.log(`Server is on http://localhost:3000`);
});
