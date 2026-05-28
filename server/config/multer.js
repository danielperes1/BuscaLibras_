const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../client/public/uploads/usuarios/'))
    },
    filename: (req, file, cb) => {
        const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        cb(null, nomeUnico)
    }
})

const upload = multer({ storage })

module.exports = upload
