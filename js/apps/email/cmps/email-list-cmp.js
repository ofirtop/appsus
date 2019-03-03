import emailPreview from '../cmps/email-preview-cmp.js';
import emailService from '../services/email-service-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js';

export default {
    template: `
            <section class="email-list">
                <email-filter @filterChanged="setFilter" @sortChange="setSortChanged" @reverseChange="setReverse"></email-filter>
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
            },
            sorter: 'date',
            isReverse:false
        }
    },
    methods: {
        onMailRead() {
            emailService.saveEmails();
        },
        setFilter(filter) {
            console.log('email-list: filter received: ', filter)
            this.filterBy.text = filter.text;
            this.filterBy.isRead = filter.isRead;
        },
        setSortChanged(sorter) {
            console.log('email-list: sorter received: ', sorter)
            this.sorter = sorter;
        },
        setReverse(reverse){
            console.log('email-list: reverse received: ', reverse)
            this.isReverse = reverse;
        }
    },
    computed: {
        emailToShow() {
            this.$emit('UnreadEmailsCounter', emailService.getUnReadEmailsCounter());

            if (!this.emails) return this.email;

            if (this.sorter === 'date') {
                console.log('email-list: sorter <date> activated.. ')
                this.emails.sort((a, b) => {
                    a = new Date(a.sendAt);
                    b = new Date(b.sendAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                });
            } else  {
                console.log('email-list: sorter <subject> activated.. ')
                this.emails.sort((a, b) => {
                    a = a.subject;
                    b = b.subject;
                    return a > b ? -1 : a < b ? 1 : 0;
                });
            }
            if(this.isReverse)  this.emails.reverse();

            return this.emails.filter(email => {

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
    components: {
        emailPreview,
        emailFilter
    },
    name: 'email-list'
}