import noteContainer from './note-container-cmp.js';

export default {
    name:'note-list',
    props:['notes'],
    template: `
        <section class="note-list">
            <!-- TODO pinned
            <ul class="pinned">
                <li v-for="note in pinnedNotes" :key="note.id">
                    <note-container :note="note"></note-container>
                </li> 
            </ul> -->
            <ul class="unpinned">
                <li v-for="note in notes" :key="note.id" @click="selectNote(note)">
                    <note-container :note="note" ></note-container>
                </li> 
            </ul>
        </section>
    `,
    computed:{
        pinnedNotes(){
            return this.notes.filter(note => note.pinned);
        },
        unPinnedNotes(){
            return this.notes.filter(note => !note.pinned);
        }
    },
    methods:{
        selectNote(note){
            console.log('select note', note);

            this.$emit('selected', note);
        }
    },
    components:{
        noteContainer,
    }
}