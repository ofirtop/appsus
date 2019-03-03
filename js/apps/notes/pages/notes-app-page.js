import noteService from '../services/note-service.js';
import noteList from '../cmps/note-list-cmp.js';
import noteEdit from '../cmps/note-edit-cmp.js';
import { eventBus, EVENT_TOGGLE_MODAL } from '../../../event-bus.js';

export default {
    template: `
        <section class="notes-app">
            <h1>Notes</h1>
            <note-edit @added="addNote" ></note-edit>
            <note-list :notes="notes" @selected="selectNote"></note-list>
            
            <note-edit @updated="updateNote" :note="currNote" class="modal-content" :class="{hidden: !inEditMode}"></note-edit>
        </section> 
    `,
    data() {
        return {
            notes: [],
            currNote: null,
            inEditMode: false
        };
    },
    name: 'notes-app',
    methods: {
        selectNote(note) {
            console.log('editing note', note);
            eventBus.$emit(EVENT_TOGGLE_MODAL, true);
            this.currNote = note;
            this.$router.push('/notes/' + note.id);
        },
        addNote(note) {
            noteService.addNote(note);
            this.notes = noteService.getNotes();
        },
        updateNote(note) {
            console.log('editNote', note);

            noteService.updateNote(note);
            this.notes = noteService.getNotes();
        }
    },
    created() {
        this.notes = noteService.getNotes();
        console.log('notes', this.notes);

        //check if a note should be edited
        let noteId = this.$route.params.noteId;
        console.log('noteId', noteId);

        eventBus.$on(EVENT_TOGGLE_MODAL, (res) => this.inEditMode = res);

    },
    watch: {
        '$route.params.noteId': function (noteId) {
            console.log('noteId', noteId);
        }
    },
    components: {
        noteList,
        noteEdit
    }
}