require('dotenv').config();

const mongoURI =
  process.env.ENVIRONMENT === 'development'
    ? 'mongodb+srv://admin:adminpassword@cluster0.l0pfd.mongodb.net/axias?retryWrites=true&w=majority'
    : 'mongodb://doof:scorpion@127.0.0.1:27017/axias?authSource=admin';

export default {
  mongoURI: mongoURI,
  tinifyKey: '26gbBPzqfSbS9Ks1SCzpYqHMDJVNrSWs',
  EMAIL_ID: 'axiasgems@gmail.com',
  EMAIL_PASS: 'gemwebsite',
  EMAIL_HOST: 'smtp.gmail.com',
  EMAIL_PORT: 465,
};
