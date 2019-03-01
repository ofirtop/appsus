import emailPreview from '../cmps/email-preview-cmp.js';
import emailService from '../services/email-service-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js';

export default {
    template: `
            <section class="email-list" >
                <!-- <div>
                <input type=text placeholder="filter by text" class="filter-text"
                       v-model="filterBy.text" >
                Unread <input type="radio" :value="false" v-model.number="filterBy.isRead"/>
                Read   <input type="radio" :value="true" v-model.number="filterBy.isRead"/>
                <button type="button" v-on:click="clearFilter">Clear</Button>
                </div> -->
                <email-filter @filterChanged="setFilter"></email-filter>
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
                text: '',
                isRead: ''
            }
        }
    },
    methods: {
        onMailRead() {
            emailService.saveEmails();
        },
        setFilter(filter){
            this.filterBy.text = filter.text;
            this.filterBy.isRead = filter.isRead;
        }
    },
    computed: {
        emailToShow() {
            
            var readStateFilter = this.filterBy.isRead;
            console.log('readStateFilter: ',readStateFilter)

            var counter = emailService.getUnReadEmailsCounter();
            this.$emit('UnreadEmailsCounter', counter);

            if (!this.emails) return this.email;

            console.log('filter.text: ', this.filterBy.text)
            var sortedMails = this.emails.sort((a, b) => {
                a = new Date(a.sendAt);
                b = new Date(b.sendAt);
                return a > b ? -1 : a < b ? 1 : 0;
            });

            return this.emails.filter(email => {
                // debugger
                return (email.subject.toLowerCase().includes(this.filterBy.text.toLowerCase()) ||
                    email.body.toLowerCase().includes(this.filterBy.text.toLowerCase())) &&
                    (this.filterBy.isRead === '' || this.filterBy.isRead === email.isRead)
            })

        }
    },
    created() {
        this.emails = emailService.loadEmails();
        console.log('email-list created emails:', this.emails);
        var counter = emailService.getUnReadEmailsCounter();
        this.$emit('UnreadEmailsCounter', counter);
    },
    components:{
        emailPreview,
        emailFilter
    },
    name: 'email-list'
}