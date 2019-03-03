import noteService from "../services/note-service.js";

export default {
    name: 'note-edit',
    props: ['note'],
    template: `
        <section class="note-edit">
            <div class="note-place-holder flex space-between" v-if="mode !== 'edit'" @click="selectType('txt')">
                <div style="padding-top: 5px; padding-left: 15px;">
                    Take a note...
                </div>
                <div class="buttons">
                    <button type="button" @click.stop="selectType('img')" title="Image" class="btn-note">
                        <i class="fa fa-picture-o" ></i>
                    </button>
                    <button type="button" @click.stop="selectType('txt')" title="Text" class="btn-note">
                        <i class="fa fa-file-text-o"></i>
                    </button>
                    <button type="button" @click.stop="selectType('todo')" title="List" class="btn-note">
                        <i class="fa fa-list-ul"></i>
                    </button>
                </div>
            </div>

            <form @submit.prevent="saveNote" v-if="mode==='edit'" >
                <input type="text" :placeholder="placeHolder" v-model="content" class="form-control" autofocus/>    
                <div class="text-right mt-4">
                    <button type="submit" class="btn btn-secondary">Save</button>
                    <button type="button" @click="mode = 'idle'" class="btn btn-light">Close</button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            content: '',
            mode: 'idle',
            placeHolder: '',
            noteType: ''
        };
    },
    created() {
        console.log('created', this.note)
        if (this.note) this.initEditNote();
    },
    watch: {
        note() {
            console.log('watch', this.note)
            if (this.note) this.initEditNote();
        }
    },
    methods: {
        initEditNote() {
            console.log('initEditNote', this.note)

            this.mode = 'edit';
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
        initAddNote() {
            console.log('initAddNote', this.note)

            this.mode = 'idle';
        },
        selectType(noteType) {

            this.noteType = noteType;
            this.mode = 'edit'

            switch (noteType) {
                case 'img':
                    this.placeHolder = 'Add image url...';
                    break;
                case 'txt':
                    this.placeHolder = 'Take a note...';
                    break;
                case 'todo':
                    this.placeHolder = 'Add list seperated by commas';
                    break;
            }
            console.log('noteType', this.noteType);
            console.log('placeholder', this.placeHolder);


        },
        saveNote() {

            let noteCopy = this.note;
            if (!noteCopy) {
                noteCopy = { type: this.noteType, id: 0 };
            }

            switch (noteCopy.type) {
                case 'img':
                    noteCopy.content = { url: this.content };
                    break;
                case 'txt':
                    noteCopy.content = { txt: this.content };
                    break;
                case 'todo':
                    noteCopy.content = { todo: this.content.split(',') };
                    break;
            }

            if (noteCopy.id) noteService.updateNote(noteCopy);
            else {
                noteService.addNote(noteCopy);
                this.reset();
            }
            this.$router.push('/notes');
        },
        reset() {
            this.mode = 'idle';
            this.content = '';
            this.noteType = '';
        }
    }
}