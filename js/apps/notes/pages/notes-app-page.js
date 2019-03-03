
import noteService from '../services/note-service.js';
import noteList from '../cmps/note-list-cmp.js';

export default {
    template: `
        <section class="notes-app">
            <h1>Notes</h1>
            <router-link to="/notes/0">Add</router-link>
            <note-list :notes="notes"></note-list>
        </section> 
    `,
    data(){
        return {
            notes:[]
        };
    },
    name:'notes-app',
    created(){
        this.notes = noteService.getNotes();
        console.log('notes', this.notes);
    },
    components:{
        noteList
    }
}