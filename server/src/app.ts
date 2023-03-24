import express from 'express'
import config from 'config'
import bodyParser from 'body-parser';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes/routes';

const port = config.get<number>('port')

const app = express()

//  Middleware
app.use(bodyParser.json());
console.log('DB Connected')
app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`)
    await connect();

    routes(app)
})