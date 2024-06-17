const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const c = await mongoose.connect("mongodb+srv://sanjayhjp121:sanjay123@cluster0.7txfrxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`database connected with ${c.connection.host}`)
    } catch (error) {
        console.log(error.message)
        console.log('database not connected')
    }
}

module.exports = connectDB