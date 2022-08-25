//Importation du package multer
const multer = require('multer');
const path = require('path');

//Types de fichiers acceptés
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};
const chemin = path.join(__dirname , '../images');

//Création de l'objet de configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, chemin);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

//exportation du Middleware
module.exports = multer({ storage: storage }).single('image');