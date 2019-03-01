import emailPreview from '../cmps/email-preview-cmp.js'
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
            <section class="email-list" >
                <input type=text placeholder="filter by text" class="filter-text"
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
         
            var counter = emailService.getUnReadEmailsCounter();
            this.$emit('UnreadEmailsCounter', counter);
            
            if (!this.emails) return this.email;

            console.log('filter.text: ', this.filterBy.text )
            var sortedMails = this.emails.sort((a, b) => {
                a = new Date(a.sendAt);
                b = new Date(b.sendAt);
                return a > b ? -1 : a < b ? 1 : 0;
            });

            if (this.filterBy.text === '') return sortedMails;
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