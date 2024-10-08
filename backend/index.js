const connectToMongo = require('./db');
const express = require('express'); 
var cors = require('cors')
const app = express(); 
const port = 5001; 
app.use(cors())
app.use(express.json())
connectToMongo();
// Middleware necessary to use app.body 
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
