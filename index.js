const express = require('express');
const http = require('http');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4, } = require('uuid');
const main = fs.readFileSync(path.join(__dirname, '/public/index.html'), 'utf8');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const imageStorage = path.join(__dirname, '/images/');
        if(!fs.existsSync(imageStorage)) fs.mkdirSync(imageStorage);
        callback(null, imageStorage);
    },
    filename: function(req, file, callback) {
        callback(null, uuidv4() + path.extname(file.originalname));
    }
});
const fieldArr = [
    { name: 'file[0]', maxCount: 1 },
    { name: 'file[1]', maxCount: 1 },
    { name: 'file[2]', maxCount: 1 },
    { name: 'file[3]', maxCount: 1 },
    { name: 'file[4]', maxCount: 1 },
    { name: 'file[5]', maxCount: 1 }
]
const app = express();
app.use("/public", express.static('public'));
app.get('/', function(request, response) {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
    response.send(main);
});

app.post('/upload', multer({storage}).fields(fieldArr), function(request, response) {
    if(request.files[request.body.isPrimary]) {
        console.log(request.files[request.body.isPrimary]);
    }
    if(request.body.startDate) {
        console.log(request.body.startDate);
    }
    if(request.body.endDate) {
        console.log(request.body.endDate);
    }
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.send({data: 'upload file successful.'});
});

const server = http.Server(app);
const port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log(`listening for requests on port ${port}`);
});