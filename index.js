const express = require('express');

const dbRouter = require('./data/router');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Users API</h2>
  `);
});

app.use('/api/posts', dbRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});