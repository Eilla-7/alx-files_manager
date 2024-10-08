const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
