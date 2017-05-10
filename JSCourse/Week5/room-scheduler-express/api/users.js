var router = require('express').Router()

const users = [
  { name: 'Yellow' },
  { name: 'Orange' },
  { name: 'Red' },
  { name: 'Green' },
  { name: 'Main Conference Room' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
