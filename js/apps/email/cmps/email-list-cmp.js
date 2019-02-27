import emailPreview from '../cmps/email-preview-cmp.js'
export default {
    props:['emails'],
    template:`
            <section>
                <email-preview v-for="currEmail in emails" 
                :key="currEmail.id"
                :email="currEmail"></email-preview>
            </section>
    `,
    components:{
        emailPreview
    },
    name:'email-list'
}