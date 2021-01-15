require('dotenv').config();

const mongoURI =
  process.env.ENVIRONMENT === 'development'
    ? 'mongodb+srv://admin:warrior@00@cluster0.kwizh.mongodb.net/jdv?retryWrites=true&w=majority'
    : 'mongodb://doof:scorpion@127.0.0.1:27017/jdv?authSource=admin';
    

export default {
  mongoURI: mongoURI,
  tinifyKey: '26gbBPzqfSbS9Ks1SCzpYqHMDJVNrSWs',
  EMAIL_ID: 'jdv@gmail.com',
  EMAIL_PASS: 'jdvwebsite',
  EMAIL_HOST: 'smtp.gmail.com',
  EMAIL_PORT: 465,
};
