require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const dbConnection = require('./db/connect')
const authRoute = require('./routes/auth')
const jobsRoute = require('./routes/jobs')
const authMiddleware = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/', authRoute)
app.use('/api/v1/jobs',authMiddleware, jobsRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
