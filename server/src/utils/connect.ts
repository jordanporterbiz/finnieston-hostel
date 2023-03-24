import mongoose from 'mongoose'
import config from 'config'

async function connect() {
    const dbUri = config.get<string>('dbUri')

    try {
        return await mongoose.connect(dbUri).then(() => {
            console.log('Connected to Database')
        })
    } catch (error) {
        console.error('Could not connect to db')
        process.exit(1);
    }
 
      
}

export default connect