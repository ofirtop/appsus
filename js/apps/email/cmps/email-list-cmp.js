import emailPreview from '../cmps/email-preview-cmp.js'
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
            <section class="email-list" >
                <input type=text placeholder="filter by text" 
                       v-model="filterBy.text" @input="setFilter">
                <email-preview 
                    v-for="currEmail in emailToShow" 
                    :key="currEmail.id"
                    :email="currEmail"
                    @mailread="onMailRead"></email-preview>
            </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                text: ''
            }
        }
    },
    components: {
        emailPreview
    },
    methods: {
        onMailRead() {
            emailService.saveEmails();
        },
        setFilter() {

        }
    },
    computed: {
        emailToShow() {
            console.log('filter.text: ',this.filterBy.text)
            if (this.filterBy.text === '') return this.emails;
            else {
                return this.emails.filter(email => {
                    return email.subject.toLowerCase().includes(this.filterBy.text.toLowerCase());
                })
            }
        }
    },
    created() {
        this.emails = emailService.loadEmails();
        console.log('email-list created emails:', this.emails);
        var counter = emailService.getUnReadEmailsCounter();
        this.$emit('UnreadEmailsCounter', counter);
    },
    name: 'email-list'
}