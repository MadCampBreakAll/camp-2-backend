import express from "express";
import morgan from "morgan";
import IndexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";

let app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/", IndexRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log(`Server is on http://localhost:3000`);
});
