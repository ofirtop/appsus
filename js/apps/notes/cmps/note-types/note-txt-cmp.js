export default {
    name: 'note-txt',
    props:['content'],
    template: `
        <section class="note note-txt">
           {{content.txt}}
        </section>
    `
}