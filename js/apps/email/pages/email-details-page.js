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
        </section>
    `,
    data(){
        return {
            email :null
        }
    },
    methods:{
        
    },
    computed:{
        timeRecieved() {
            return utilService.formatTime(this.email.sendAt);
        }
    },
    created(){
        this.email = emailService.getEmailById(+this.$route.params.id);
    },
    name:'email-details'
}