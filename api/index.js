const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

// Routes
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const userdetailRoutes = require('./routes/userdetailRoutes');
const authRoutes = require('./routes/authRoutes')
const materialRoutes = require('./routes/materialRoutes')

// Initialize express
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 
        message: 'Hello World' 
    });
});

// Routes
app.use('/m_role', roleRoutes);
app.use('/m_user', userRoutes);
app.use('/m_userdetail', userdetailRoutes);
app.use('/auth', authRoutes);
app.use('/m_material', materialRoutes)

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
