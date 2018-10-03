const fs = require('fs');

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {title, body};
  var duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

var getAllNotes = () => {
  return fetchNotes();
}

var readNote = (title) => {
  var notes = fetchNotes();
  var filtered = notes.filter((note) => note.title === title);
  return filtered[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filtered = notes.filter((note) => note.title !== title);
  saveNotes(filtered);
  return notes.length !== filtered.length;
}

var fetchNotes = () => {
  var notes = []
  try {
    notes = JSON.parse(fs.readFileSync("notesData.json"));
  } catch (err) {}
  return notes;
}

var saveNotes = (notes) => {
  fs.writeFileSync("notesData.json", JSON.stringify(notes));
}

var printNote = (note) => console.log(`${note.title} - ${note.body}`)

module.exports = {
  addNote, getAllNotes, readNote, removeNote, printNote
}
