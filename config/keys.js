// import keys_prod from './keys_prod.js'
// var keys_dev = process.env.NODE_ENV === 'production' ? {} : import(keys_dev)
// console.log(process.env.NODE_ENV)


// export default process.env.NODE_ENV === 'production' ? keys_prod : keys_dev;

export default {
  secretOrKey: process.env.SECRET_OR_KEY,
  emailAuthToken: process.env.EMAIL_AUTH_TOKEN,
  hostEmail: process.env.HOST_EMAIL,
  hostPassword: process.env.HOST_PASSWORD,
  mongoURL: process.env.MONGO_URL
}
