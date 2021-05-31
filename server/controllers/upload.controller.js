const cloudinary = require('../utils/cloudinary')
const db = require('../db')

module.exports = {
  fileupload: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      const resp = await db.query(
        'UPDATE users SET' +
          ' profileurl = $1,' +
          ' cloudinary_id = $2,' +
          ' updated = NOW() WHERE userid = $3 RETURNING *',
        [result.secure_url, result.public_id, res.locals.userid]
      )

      return res.status(200).json({
        message: 'Profile image upload successfully',
        profileurl: result.secure_url,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal error' })
    }
  },
}
