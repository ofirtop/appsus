import utilService from './util-service.js';

export default {
    getNotes
};

let gNextId = 1;
let gNotes = [];
const STORAGE_KEY = 'notes';

createNotes();

function createNotes() {

    let notes = utilService.loadFromStorage(STORAGE_KEY);
   
    if (!notes) {
        notes = [];
        notes.push(createNote('text', { txt: 'call Taly' }));
        notes.push(createNote('img', { url: 'https://api.adorable.io/avatars/285/a' }));
        notes.push(createNote('todo', { txtList: ['tomato', 'cucumber', 'cheese'] }));
        
        utilService.saveToStorage(STORAGE_KEY, notes);
    }
    gNotes = notes;
}

function createNote(type, noteData) {
    return {
        id: gNextId++,
        type: type,
        txt: noteData.txt,
        url: noteData.url,
        txtList: noteData.txtList,
        pinned: false
    };
}

function getNotes(){
    return gNotes;
}