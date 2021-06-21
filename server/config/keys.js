import keys_prod from './keys_prod.js';
var keys_dev = process.env.NODE_ENV === 'production' ? {} : import(keys_dev);

export default process.env.NODE_ENV === 'production' ? keys_prod : keys_dev;

// export default {
//   localIP: process.env.LOCAL_IP,
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   bucket: process.env.BUCKET,
//   mongoURL: process.env.MONGO_URL
// }
