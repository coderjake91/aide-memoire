const fs = require('fs');
const path = require('path');

//adds the ability of the client to add a new animal to the server
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    //write in the new animal data to the animals.json file in JSON
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return note;
}

function validateNewNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

//function that finds and returns a single animal object by its id parameter
function findByIdAndDelete(id) {
    notesJSON = fs.readFileSync( path.join(__dirname, '../data/db.json'), 'utf-8');

    let notesObj = JSON.parse(notesJSON);
    console.log(notesObj.notes);

    let noteFound = {};
    //remove note by id
    const newNotesArray = notesObj.notes
        .filter(note => {
            if(note.id === id) {
                noteFound = note;
                return false;
            } else {
                return true;
            }
        }).map(note => {return note});

    console.log(newNotesArray);
    //write new notes array (with removed note not present) to db.json
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: newNotesArray}, null, 2)
    );

    return noteFound;
}

module.exports = {
    createNewNote,
    validateNewNote,
    findByIdAndDelete
};