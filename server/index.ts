import express from "express";
import cors from "cors";
import router from "./router";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3100;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
