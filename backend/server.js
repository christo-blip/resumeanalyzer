require('dotenv').config();
const express = require('express');
const cors = require('cors');

const resumeRoutes = require('./routes/resume.routes');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json({
    limit:'10mb'
}));

app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});