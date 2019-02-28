import { eventBus, EVENT_EMAIL_READ } from '../../../event-bus.js';
import utilService from '../../../services/util-service.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            
            <div class="flex space-between" v-on:click="onSelected" v-if="!selected" >
                <div class=" flex">
                    <div>{{email.from}}</div>
                    <div class="email-subject">{{email.subject}}</div>
                </div>
                <div>{{timeRecieved}}</div>
            </div>    
            <div v-else v-on:click="onSelected">
                <div class="flex space-between">
                    <h3>{{email.subject}}</h3>
                    <h3>{{timeRecieved}}</h3>
                </div>
                <h4>{{email.from}}<span>{{email.fromEmail}}</span></h4>
                <p>{{email.body}}</p>
            </div>
            <div class="handlers">
                <button v-on:click="DetailedView">Deatails</button>
            </div>
        </section>
    `,
    data() {
        return {
            selected: false
        }
    },
    methods: {
        onSelected() {
            this.selected = !this.selected;
            //if email read send event to the event bus
            console.log('emiting read event to emailApp')
            if (!this.email.isRead) setTimeout(() => { eventBus.$emit(EVENT_EMAIL_READ) }, 2000)
            this.email.isRead = true;
            this.$emit('mailread');
        },
        DetailedView() {
            debugger
            var strRout = `emails/details/${this.email.id}`;
            console.log('about to move to detailed view',strRout);
            this.$router.push(strRout);
        }
    },
    computed: {
        timeRecieved() {
            return utilService.formatTime(this.email.sendAt);
        }
    },
    created() {
        console.log('email preview created')
    },
    name: 'email-preview'
}