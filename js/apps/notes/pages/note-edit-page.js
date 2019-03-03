import noteService from "../services/note-service.js";

export default {
    name: 'note-edit',
    template: `
        <section>
            note edit
            <form @submit.prevent="saveNote" >
                <input type="text" placeholder="what's on your mind" v-model="content" class="form-control"/>    
                </ br>
                <div>
                    <button type="button" @click="note.type === 'img'">img</button>
                    <button type="button" @click="note.type === 'txt'">text</button>
                    <button type="button" @click="note.type === 'todo'">todo</button>
                </div>
                <button type="submit">save</button>
            </form>
        </section>
    `,
    data() {
        return {
            content: '',
            note: null,
        };
    },
    created() {
        let noteId = +this.$route.params.noteId;
        if (noteId === 0) {
            this.note = {};
            return;
        }
        this.note = noteService.getNoteById(+noteId);
        console.log('note', this.note);
        switch (this.note.type) {
            case 'img':
                this.content = this.note.content.url;
                break;
            case 'txt':
                this.content = this.note.content.txt;
                break;
            case 'todo':
                this.content = this.note.content.todo.toString();
                break;
        }
    },
    methods: {
        saveNote() {
            debugger;
            switch (this.note.type) {
                case 'img':
                    this.note.content = { url: this.content };
                    break;
                case 'txt':
                    this.note.content = { txt: this.content };
                    break;
                case 'todo':
                    this.note.content = { todo: this.content.split(',') };
                    break;
            }
            console.log('note', this.note);
            debugger;
            if (this.note.id) noteService.updateNote();
            else noteService.addNote(this.note);
            this.$router.push('/notes');
        }
    }
}