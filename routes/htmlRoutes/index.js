const router = require('express').Router();
const path = require('path');

//route that serves the index.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

//wildcard route to catch non-existent requests (this route always comes last)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;