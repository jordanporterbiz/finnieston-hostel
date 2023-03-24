import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'
async function connect() {
    const dbUri = config.get<string>('dbUri')

    try {
        return await mongoose.connect(dbUri).then(() => {
            logger.info('Connected to Database')
        })
    } catch (error) {
        logger.error('Could not connect to db')
        process.exit(1);
    }
 
      
}

export default connect