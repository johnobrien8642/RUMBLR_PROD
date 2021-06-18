import app from './server/server.js';
import mongoose from 'mongoose';
import keys from './config/keys/keys.js';

const port = process.env.PORT || 5000

mongoose
  .connect(keys.mongoURL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB successfully')
    app.listen({ port: port }, () => console.log(`Server listening on port ${port}`))
  }).catch(err => console.log(err))


