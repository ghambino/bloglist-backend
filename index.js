const app = require('./app.js');
const https = require('https');
const fs = require('fs');
const { PORT } = require('./utils/config')

const httpsServer = https.createServer({
    key: fs.readFileSync(`./certificates/key.pem`),
    cert: fs.readFileSync(`./certificates/cert.pem`)
}, app);

httpsServer.listen(PORT, () => {
    console.log('server is running locally on port', PORT)
})