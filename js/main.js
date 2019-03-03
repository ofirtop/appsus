import emailIndicator from './apps/email/cmps/email-indicator-cmp.js';
import emailService from './apps/email/services/email-service-cmp.js';
import { eventBus, EVENT_EMAIL_READ,EVENT_EMAIL_DELETE,EVENT_EMAIL_ADD } from './event-bus.js'
import myRoutes from './routes.js';

const myRouter = new VueRouter({ routes: myRoutes })
Vue.use(myRouter)

new Vue({
    el: '#app',
    router: myRouter,
    data: {
        selected: true,
        status: {
            total: 0,
            unread: 0
        }
    },
    methods: {
        imgClicked() {
            this.selected = !this.selected;
        },
        channgeStatus(){
            this.status.unread = emailService.getUnReadEmailsCounter();
            this.status.total = emailService.getTotalEmailcount();
        }
    },
    created() {
        emailService.loadEmails();
        this.channgeStatus();
        eventBus.$on(EVENT_EMAIL_READ, () => {
            this.channgeStatus()
        });
        eventBus.$on(EVENT_EMAIL_DELETE, () => {
            this.channgeStatus()
        });
        eventBus.$on(EVENT_EMAIL_ADD, () => {
            this.channgeStatus()
        });
    },
    components: {
        emailIndicator,
        emailService
    }
})

