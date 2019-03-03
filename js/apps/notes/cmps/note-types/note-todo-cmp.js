export default {
    name: 'note-todo',
    props: ['content'],
    template: `
        <section class="note note-todo">
            <ul>
                <li v-for="item in content.todo">{{item}}</li>
            </ul>
        </section>
    `
}