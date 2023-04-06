const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
import router from './router'
const cors = require("cors");

app.use("cors");
app.use(express.json());
app.use(router)
app.listen(port, () => {
  `Server is listening on ${port}`;
});

module.exports = app;
