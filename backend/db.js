// Connect mongoose with node using MONGOOSEs

// importing mongoose
const mongoose = require('mongoose')
//URL for Mongoose
const mongoURI = "mongodb://0.0.0.0:27017/inotebook?directConnection=true&tls=false&readPreference=primary"

async function connect() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = { connect };

