const express = require("express");
const app = express();

// IMPORTANT: match Coolify later
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello from Deploy test app 2 👋");
});

app.listen(port, () => {
  console.log(`Server 2 listening on port ${port}`);
});
