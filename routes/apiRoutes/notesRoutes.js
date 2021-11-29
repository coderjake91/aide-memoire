//allow for the interance of the 'app' express server in server.js to be used in this router file
const router = require('express').Router();
const {} = require('../../lib/notes');
//interface with the faux database
const { notes } = require('../../data/db.json');


router.get('/notes', (req, res) => {
 
    
});

router.post('/notes', (req, res) => {

});

module.exports = router;