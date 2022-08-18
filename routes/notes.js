const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        res.json(`Note added successfully 🚀`);
    } else {
        res.status(500).json('Error in posting review');
    }
});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    const deleteID = req.params.id;
    
    readAndRemove(deleteID, './db/db.json');

    res.json(`Note deleted successfully 🚀`);
});

module.exports = notes;
