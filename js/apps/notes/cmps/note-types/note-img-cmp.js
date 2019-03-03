export default {
    name: 'note-img',
    props: ['content'],
    template: `
        <section class="note-img">
            <div class="note-content">
                <img :src="content.url" />
                <!-- <img src="img/temp/022.jpg" /> -->
            </div>
        </section>
    `
}