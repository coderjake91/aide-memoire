const router = require('express').Router();
const notesRoutes = require('./notesRoutes');

//middleware so the app can use the routes in 'notesRoutes.js' or future routes
router.use(notesRoutes);

module.exports = router;