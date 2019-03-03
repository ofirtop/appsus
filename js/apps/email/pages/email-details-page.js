import emailService from '../services/email-service-cmp.js';
import utilService from '../../../services/util-service.js';

export default {
    template: `
        <section class="email-details flex-col">
            <div>
                <div class="flex space-between">
                    <div>{{email.subject}}</div>
                    <div>{{timeRecieved}}</div>
                </div>
                <div class="flex ">
                    <div>{{email.from}} :</div>
                    <div>{{email.fromEmail}}</div>
                </div>
                <p class="flex-grow1">{{email.body}}</p>
            </div>
            <div class="handlers">
            
                    <i class="fa fa-reply" aria-hidden="true" title="Reply" v-on:click.stop="reply"></i>
                    <i class="fa fa-trash-o" aria-hidden="true" title="delete" v-on:click.stop="deleteEmail"></i>
                    <i class="fa fa-backward" aria-hidden="true" v-on:click.stop="backToInbox"></i>
            
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
        },
        backToInbox(){
            this.$router.push('/emails');
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