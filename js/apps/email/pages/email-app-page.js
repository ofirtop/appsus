import { eventBus, EVENT_EMAIL_READ } from '../../../event-bus.js';
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
        <section class="email-app flex">
            <div class="left-bar">
                <div>
                    <router-link to="/emails/compose">Compose</router-link>
                </div>
                <div>
                    <router-link to="/emails">Inbox ({{emailReadCounter}})</router-link>
                </div>
            </div>
            <!-- email-list and compose-email will be rendered here -->
            <router-view @UnreadEmailsCounter="setUnreadEmailcounter"></router-view>
        </section> 
    `,
    data() {
        return {
            emails: null,
            emailReadCounter: 0
        }
    },
    methods: {
    /*  Update Unread Email Counter
        this function is called one time, on the creation of the email list.  */
        setUnreadEmailcounter(counter) {
            console.log('counter received from email-list after email load. counter: ',counter)
            this.emailReadCounter = counter;
        }
    },
    components: {
    },
    created() {
        console.log('email app got emails: ', this.emails);
        //register to read email notification
        eventBus.$on(EVENT_EMAIL_READ, () => {
            this.emailReadCounter = emailService.getUnReadEmailsCounter();
        });

    },
    name: 'email-app'
}