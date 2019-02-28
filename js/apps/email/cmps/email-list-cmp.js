import emailPreview from '../cmps/email-preview-cmp.js'
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
            <section class="email-list" >
                <email-preview 
                    v-for="currEmail in emails" 
                    :key="currEmail.id"
                    :email="currEmail"
                    @mailread="onMailRead"></email-preview>
            </section>
    `,
    data() {
        return {
            emails: null
        }
    },
    components: {
        emailPreview
    },
    methods:{
        onMailRead(){
            emailService.saveEmails();
        }
    },
    created() {
        this.emails = emailService.loadEmails();
        console.log('email-list created emails:',this.emails);
        var counter = emailService.getUnReadEmailsCounter();
        this.$emit('readEmailsCounter',counter);        
    },
    name: 'email-list'
}