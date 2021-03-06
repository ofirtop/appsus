import noteImg from './note-types/note-img-cmp.js';
import noteTxt from './note-types/note-txt-cmp.js';
import noteTodo from './note-types/note-todo-cmp.js';
import noteService from '../services/note-service.js';

export default {
    name: 'note-container',
    props: ['note'],
    template: `
                <section class="note-wrapper" @click="bla">
                    <div class="note-container">
                        <i class="fa fa-check-circle fa-2x check note-editable"></i>
                        <div class="note-content">
                            <button class="pin" :class="{pinned: note.pinned}"  @click.stop="note.pinned = !note.pinned"></button>
                            <component :is="currCmp" :content="note.content"></component>
                        </div>
                        <div class="buttons-container note-editable">
                            <button @click.stop="deleteNote(note.id)" class="btn-note">
                                <i class="app-btn fa fa-trash-o" ></i>
                            </button>
                        </div>
</div>
                </section>        
            `,
    computed: {
        currCmp() {
            switch (this.note.type) {
                case 'img':
                    return 'noteImg';
                case 'txt':
                    return 'noteTxt';
                case 'todo':
                    return 'noteTodo';
                default:
                    console.error('cmpType not defined', this.note.type);
            }
        }
    },
    methods: {
        bla(){
            console.log('click on note wrapper', '');
            
        },
        deleteNote(noteId) {
            noteService.deleteNote(noteId)
                .then(() => { });
        },
        pinNote(noteId) {
            console.log('pinned', this.note);

             this.note.pinned = true;
        }
    },
    components: {
        noteImg,
        noteTxt,
        noteTodo
    }
}
