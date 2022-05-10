const router = require('express').Router()
const uploadImage = require('./../middleware/uploadImage')
const uploadCtrl = require('./../controllers/uploadCtrl')
const auth = require('./../middleware/auth')
const fileUpload = require("express-fileupload");
router.post('/upload_avatar',fileUpload({
    useTempFiles: true
}), uploadImage, auth,uploadCtrl.uploadAvatar)

module.exports = router