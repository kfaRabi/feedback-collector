const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("hello there");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening to PORT:", PORT);
});