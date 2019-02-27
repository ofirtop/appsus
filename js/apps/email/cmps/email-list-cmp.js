import emailPreview from '../cmps/email-preview-cmp.js'
export default {
    props:['emails'],
    template:`
            <section>
                <email-preview v-for="email in emails" :key="email.id"></email-preview>
                <pre>{{emails}}</pre>
            </section>
    `,
    components:{
        emailPreview
    },
    name:'email-list'
}