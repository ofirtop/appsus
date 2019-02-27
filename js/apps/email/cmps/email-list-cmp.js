import emailPreview from '../cmps/email-preview-cmp.js'
export default {
    props:['emails'],
    template:`
            <section class="email-list">
                <email-preview v-for="currEmail in emails" 
                :key="currEmail.id"
                :email="currEmail"></email-preview>
            </section>
    `,
    components:{
        emailPreview
    },
    created(){
        console.log('emailList created, emails are:',this.emails)

    },
    name:'email-list'
}