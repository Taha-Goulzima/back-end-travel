const express = require('express');
const connection = require('./config/connectionDb')

const app = express();
app.use(express.json())

connection()

app.use('/user',require('./routes/userRoutes'))
app.use('/voyages' ,require('./routes/voyageRoutes'))
app.use("/association", require("./routes/associationRoutes"));



app.listen(5000,console.log('server listening on port 5000'))