const { getEventListeners } = require('events');
const http = require('http');

const fetch = require('cross-fetch'); 
var cron = require('node-cron');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
function sendNotification(eventJson){
    console.log(eventJson);
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    cron.schedule('1 * * * * *', async () => {
        console.log("Eveniment start");

        let eventsList;
        console.log("Eveniment 1");

        await fetch("http://localhost/includes/get-events.php").then(response=>response.json()).then(response=>{
            console.log("Eveniment 2");

            console.log(response);
            eventsList = response;
        });
        console.log("Eveniment 3");
        
        for(i=0;i<eventsList.length;i++){
            sendNotification(eventsList[i]);
        }
        console.log("Eveniment end");
 
    });
});
