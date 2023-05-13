const http = require('http')
const fs = require('fs')

const host = 'localhost'
const port = 8000

const requestListener = function (req, res) {
    const rs = fs.createReadStream('.' + req.url)

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 60*60*24*30);

    rs.pipe(res);
    res.writeHead(200)
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
