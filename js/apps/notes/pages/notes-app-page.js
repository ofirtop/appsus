import noteService from '../services/note-service.js';
import noteList from '../cmps/note-list-cmp.js';
import noteEdit from '../cmps/note-edit-cmp.js';

export default {
    template: `
        <section class="notes-app">
            <h1>Notes</h1>
            <note-edit></note-edit>
            <note-list :notes="notes" @selected="editNote"></note-list>
            <note-edit :note="currNote"></note-edit>
        </section> 
    `,
    data(){
        return {
            notes:[],
            currNote:null
        };
    },
    name:'notes-app',
    methods:{
        editNote(note){
            console.log('editing note', note);
            this.currNote = note;
            this.$router.push('/notes/' + note.id);
        }
    },
    created(){
        this.notes = noteService.getNotes();
        console.log('notes', this.notes);

        //check if a note should be edited
        let noteId = this.$route.params.noteId;
        console.log('noteId', noteId);
        
    },
    watch:{
        '$route.params.noteId':function (noteId){
            console.log('noteId', noteId);
        }
    },
    components:{
        noteList,
        noteEdit
    }
}