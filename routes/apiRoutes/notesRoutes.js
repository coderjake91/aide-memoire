//allow for the interance of the 'app' express server in server.js to be used in this router file
const router = require('express').Router();
const uniqid = require('uniqid');
//interface with the faux database
const { notes } = require('../../data/db.json');
const { validateNewNote, 
        createNewNote } = require('../../lib/notes');


router.get('/notes', (req, res) => {

    console.log(notes);
    //return all notes
    if(notes.length != 0){
        res.json(notes);
    } else {
        res.status(400).send('There are no stored notes!')
    }
    
    
});

router.post('/notes', (req, res) => {
     //set id using uniqid npm package
    req.body.id = uniqid();

    console.log(req.body.id);

    //if any data in req.body is incorrect (validated by validateNewAnimal()), send 400 error back
    if(!validateNewNote(req.body)){
        res.status(400).send('This Note is not properly formatted!');
    } else {
        //add animal to json file and animals array in this function
        const note = createNewNote(req.body, notes);
        console.log(note);
        res.json(note);
    }
});

module.exports = router;