const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    if(req.url ==="/favicon.ico"){
        return res.end();
    }
const log = `${JSON.stringify(req.headers)} ${req.method} ${req.url}\n`;
const myUrl = url.parse(req.url , true);
    
    console.log(myUrl);
    fs.appendFile("log.txt" , log , (err , data) => {
        if (err) {
        console.error("Error writing log:", err);
        }
        switch(myUrl.pathname){
            case"/" :
            res.end("HomePage");
            break;
            case"/about":
            const username = myUrl.query.name
            res.end(`Hey,  ${username}`);
            break;
            case"/search":
            const searchTerm = myUrl.query.search;
            res.end(`Search results for: ${searchTerm}`);
            break;
            default:
                res.end("Not found");
        }

    })
    
})


const PORT = 3000;
server.listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`);
})