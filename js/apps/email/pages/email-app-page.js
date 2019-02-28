import { eventBus, EVENT_EMAIL_READ } from '../../../event-bus.js';

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
            <router-view @readEmailsCounter="setReadEmailcounter"></router-view>
        </section> 
    `,
    data() {
        return {
            emails: null,
            emailReadCounter: 0
        }
    },
    methods: {
        setReadEmailcounter(counter) {
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
            console.log('emailApp received readEmailCounter increase request',this.emailReadCounter)
             this.emailReadCounter++ 
            });

    },
    name: 'email-app'
}