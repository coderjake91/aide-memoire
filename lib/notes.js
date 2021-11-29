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


module.exports = {
    createNewNote,
    validateNewNote
};