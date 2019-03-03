import emailService from '../services/email-service-cmp.js';
import utilService from '../../../services/util-service.js';

export default {
    template: `
        <section class="email-details">
            <div class="flex space-between">
                <div>{{email.subject}}</div>
                <div>{{timeRecieved}}</div>
            </div>
            <div class="flex ">
                <div>{{email.from}} :</div>
                <div>{{email.fromEmail}}</div>
            </div>
            <p>{{email.body}}</p>
            <div class="handlers">
                <button v-on:click="reply">Reply</button>
                <button v-on:click="deleteEmail">Delete</button>
            </div>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        deleteEmail() {
            emailService.deleteEmail(this.email.id);
            var strRout = `/emails`;
            this.$router.push(strRout);
        },
        reply() {
            var strRout = `/emails/compose/${this.email.id}`;
            console.log('about to move to detailed view', strRout);
            this.$router.push(strRout);
        }

    },
    computed: {
        timeRecieved() {
            return utilService.formatTime(this.email.sendAt);
        }
    },
    created() {
        this.email = emailService.getEmailById(this.$route.params.id);
    },
    name: 'email-details'
}