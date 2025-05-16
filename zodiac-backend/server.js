const app = require('./app');
const mongoose = require ('mongoose');
require('dotenv').config();

const PORT =process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
.connect(MONGO_URI)
.then(()=> {
    console.log ("MongoDB bağlantısı başarılı");
    app.listen(PORT, ()=> console.log(`Sunucu ${PORT} portunda çalışıyor...`));
})
.catch((err)=> console.error("Mongo bağlantı hatası:",err));