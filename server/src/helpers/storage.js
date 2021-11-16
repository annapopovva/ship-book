const multer = require('multer');

const diskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, 'uploads');
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`);
        }
    }
)

const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false);
}

const storage = multer({storage: diskStorage, fileFilter: fileFilter}).array('pictures');

module.exports = storage;