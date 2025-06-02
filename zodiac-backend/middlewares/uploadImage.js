const multer = require("multer");
const path = require("path");

// Dosyalar "uploads/profileImages/" klasörüne gidecek
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profileImages");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Sadece resim dosyaları yüklenebilir!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
