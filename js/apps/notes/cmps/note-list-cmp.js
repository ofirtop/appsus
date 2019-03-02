import noteContainer from './note-container-cmp.js';

export default {
    name:'note-list',
    props:['notes'],
    template: `
        <section class="note-list">
            <ul>
                 <li v-for="note in notes" :key="note.id">
                    <note-container :note="note"></note-container>
                </li> 
            </ul>
        </section>
    `,
    components:{
        noteContainer,
    }
}