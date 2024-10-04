const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();
app.get('/',(req,res) => {
    return res.send("Hello from Homepage")

});
app.get('/about',(req,res) => {
    return res.send("Hello from about page")

});

function myHandler(req,res)
{
    console.log(req.headers);
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url,true);
    fs.appendFile("log.txt",log, (err, data) => {
        switch(myUrl.pathname){
            case "/":
                if(req.method == "GET") res.end("HomePage");
            break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
            break;
        
            case "/signup":
                if(req.method == "GET") res.end("This is a signup form");
                else if(req.method == "POST"){
                    res.end("Success");
                }
            default:
                res.end("404 Not Found");


        }  

    });

}
const myServer = http.createServer(app);
myServer.listen(8000, () => console.log("Server Started !"));


// const express = require("express");

// const app = express();
// app.get('/',(req,res) => {
//     return res.send("Hello from Homepage")

// });
// app.get('/about',(req,res) => {
//     return res.send(`Hello ${req.query.name} your age is ${req.query.age}`);

// });


// app.listen(8000, () => console.log("Server Started !"));

