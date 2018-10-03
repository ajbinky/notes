const yargs = require('yargs');

const notes = require('./notes.js');

const title = {
  describe: 'Title of note',
  demand: 'true',
  alias: 't'
};

const body = {
  describe: 'Body of note',
  demand: 'true',
  alias: 'b'
};

var argv = yargs
  .command('add', 'Add a new note', {title: title, body: body})
  .command('list', 'List all notes')
  .command('read', 'Read a note', {title: title})
  .command('remove', 'Remove a note', {title: title})
  .help()
  .argv;
var command = argv._[0];

switch (command) {
  case "add":
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log("Note created");
      notes.printNote(note);
    } else {
      console.log("Note with same title already exists");
    }
    break;
  case "list":
    var allNotes = notes.getAllNotes();
    console.log("---" + allNotes.length + " notes---");
    allNotes.forEach(note => console.log(note));
    break;
  case "read":
    var note = notes.readNote(argv.title);
    if (note) {
      notes.printNote(note);
    } else {
      console.log("Note not found");
    }
    break;
  case "remove":
    var removed = notes.removeNote(argv.title);
    var message = removed ? 'Note removed' : 'Note not found';
    console.log(message);
    break;
  default:
    console.log("Command not recognized");
}
