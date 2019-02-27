
export default {
    template: `
        <section>
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <div>{{note.id}}</div>
                    <div>type: {{note.type}}</div>
                    <div>text: {{note.txt}}</div>
                    <div>url: {{note.url}}</div>
                    <div>txt list: {{note.txtList}}</div>
                </li>
            </ul>
        </section>
    `,
    name:'note-list',
    props:['notes']
}