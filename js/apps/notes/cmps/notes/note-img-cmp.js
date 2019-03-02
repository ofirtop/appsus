export default {
    name: 'note-img',
    props: ['content'],
    template: `
        <section class="note-img">
            <i class="fa fa-check-circle fa-2x check note-editable"></i>
            <div class="note-content">
                <img :src="content.url" />
                <!-- <img src="img/temp/022.jpg" /> -->
            </div>
        </section>
    `
}