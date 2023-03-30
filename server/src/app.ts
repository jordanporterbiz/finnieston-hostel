import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes/routes'

const port = config.get<number>('port')

const app = express()

//  Middleware
app.use(express.json())

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`)
    await connect()

    routes(app)
})
