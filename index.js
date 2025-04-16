const app = require('./app.js');
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
    console.log('server is running locally on port', PORT)
})