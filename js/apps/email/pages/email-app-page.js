import { eventBus, EVENT_EMAIL_READ, EVENT_EMAIL_ADD, EVENT_EMAIL_DELETE } from '../../../event-bus.js';
import emailService from '../services/email-service-cmp.js';

export default {
    name: 'email-app',
    template: `
        <section class="email-app flex">
            <div class="left-bar flex-col">
                <router-link class="menu-item new-email" to="/emails/compose">Compose</router-link>
                <router-link class="menu-item inbox" to="/emails">Inbox ({{unreadCounter}})</router-link>
            </div>
            <!-- email-list and compose-email will be rendered here -->
            <router-view></router-view>
        </section> 
    `,
    data() {
        return {
            emails: null,
            unreadCounter: 0
        }
    },
    methods: {
        /*  Update Unread Email Counter
            this function is called one time, on the creation of the email list.  */
        // setUnreadEmailcounter(counter) {
        //     console.log('counter received from email-list after email load. counter: ', counter)
        //     this.unreadCounter = counter;
        // }
    },
    components: {
    },
    created() {
        this.unreadCounter = emailService.getUnReadEmailsCounter();

        eventBus.$on(EVENT_EMAIL_READ, () => {
            this.unreadCounter = emailService.getUnReadEmailsCounter();
        });
        eventBus.$on(EVENT_EMAIL_ADD, () => {
            this.unreadCounter = emailService.getUnReadEmailsCounter();
        });
        eventBus.$on(EVENT_EMAIL_DELETE, () => {
            this.unreadCounter = emailService.getUnReadEmailsCounter();
        });
    }
}