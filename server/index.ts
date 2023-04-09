import express from "express";
import cors from "cors";
import router from "./router";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
