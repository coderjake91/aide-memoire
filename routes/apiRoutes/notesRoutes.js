//allow for the interance of the 'app' express server in server.js to be used in this router file
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
//interface with the faux database
const { notes } = require('../../data/db.json');
const { validateNewNote, 
        createNewNote, 
        findByIdAndDelete} = require('../../lib/notes');


router.get('/notes', (req, res) => {
    notesJSON = fs.readFileSync( path.join(__dirname, '../../data/db.json'), 'utf-8');
    let notesObj = JSON.parse(notesJSON);

    //return all notes
    if(notesObj.notes.length != 0){
        res.json(notesObj.notes);
    } else {
        res.status(400).send('There are no more notes!');
    }
    
    
});

router.delete('/notes/:id', (req, res) => {
    const noteFound = findByIdAndDelete(req.params.id);
    if(noteFound) {
        res.json(noteFound);
    } else {
        res.json(400).send('no note can be found with that ID!');
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
        //add notel to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        console.log(note);
        res.json(note);
    }
});

module.exports = router;