const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000
const cors = require('cors')
const messageRouter = require('./routes/messagesRouter')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(('/messages'), messageRouter);

app.listen(PORT, () => {
    console.log('connected to port : ' + PORT);
});