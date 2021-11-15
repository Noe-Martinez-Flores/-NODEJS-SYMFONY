const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors')


const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(require('./routes/index.js'));
app.use('/office', require('./routes/office.js'));

app.listen(app.get('port'), () => {
    console.log("Server on port",app.get('port'));
});