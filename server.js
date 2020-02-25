const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/project', require('./routes/api/project'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express Server started at port: ${PORT}`);
});
