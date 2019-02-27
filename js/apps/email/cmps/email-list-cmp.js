import emailPreview from '../cmps/email-preview-cmp.js'
export default {
    props:['emails'],
    template:`
            <section>
                <email-preview v-for="currEmail in emails" 
                :key="email.id"
                :email="currEmail"></email-preview>
                <pre>{{emails}}</pre>
            </section>
    `,
    components:{
        emailPreview
    },
    name:'email-list'
}