    import utilService from '../../../services/util-service.js';

export default {
    getNotes,
    deleteNote
};

let gNextId = 1;
let gNotes = [];
const STORAGE_KEY = 'notes';

createNotes();

function createNotes() {

    let notes = utilService.loadFromStorage(STORAGE_KEY);

    if (!notes) {
        notes = [];
        
        notes.push(createNote('img', { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png' }));
        notes.push(createNote('img', { url: 'https://api.adorable.io/avatars/132/b' }));
        notes.push(createNote('todo', { todo: ['tomato', 'cucumber', 'cheese'] }));
        notes.push(createNote('img', { url: 'https://purepng.com/public/uploads/large/purepng.com-mario-runningmariofictional-charactervideo-gamefranchisenintendodesigner-1701528632710brm3o.png' }));
        notes.push(createNote('txt', { txt: 'bla bla' }));
        notes.push(createNote('todo', { todo: ['Hagar', 'Irit', 'Avital'] }));
        notes.push(createNote('img', { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPrXXPDewjzUpzkmi7h86J-7Jq0LZzteqSYYSA4IbVNbo5-RD' }));

        utilService.saveToStorage(STORAGE_KEY, notes);
    }
    gNotes = notes;
}

function createNote(type, content) {
    return {
        id: gNextId++,
        type: type,
        content: content,
        pinned: false
    };
}

function getNotes() {
    return gNotes;
}

function deleteNote(noteId){
    let idx = gNotes.findIndex(note => note.id === noteId);
    gNotes.splice(idx, 1);

    utilService.saveToStorage(STORAGE_KEY,  gNotes);
    return Promise.resolve();
}