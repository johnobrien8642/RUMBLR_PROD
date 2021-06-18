import mongoose from 'mongoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import models from './models/index.js';
import keys from './config/keys.js'
import schema from './schema/schema.js';
import posts from './routes/api/posts.js';
import mailer from './routes/api/mailer.js';
import CronUtil from './cron/cron_util.js'
import { expressCspHeader, SELF } from 'express-csp-header';
import cors from 'cors';
const url = 'mongodb://127.0.0.1:27017/Rumblr_MERNG';
const { cronTagFollowerHeat,
        cronPostNotesHeat,
        cronTagPostHeat,
        cronUserPostingHeat } = CronUtil;

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose
  .connect(keys.mongoURL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err))

cronTagFollowerHeat.start()
cronTagPostHeat.start()
cronPostNotesHeat.start()
cronUserPostingHeat.start()

  
app.use(express.json())
app.use('/api/posts', posts);
app.use('/api/mailer', mailer);
app.use(expressCspHeader({
  directives: {
    'frame-ancestors': [SELF, 'https://open.spotify.com/', 'soundcloud.com']
  }
}))
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

export default app;

