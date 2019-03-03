import emailService from '../services/email-service-cmp.js';
import { eventBus, EVENT_EMAIL_READ, EVENT_EMAIL_DELETE } from '../../../event-bus.js';
import utilService from '../../../services/util-service.js';

export default {
    props: ['email'],
    template: `
        <section class="email-preview" @mouseover="setHandlers(true)" @mouseleave="setHandlers(false)"><!-- @onmouseleave="setHandlers(false)"-->
            
            <div class="email-item flex space-between" :class="{bold: !email.isRead}" v-on:click="onSelected" v-if="!selected" >
                <div class=" flex">
                    <div>{{email.from}}</div>
                    <div class="email-subject">{{email.subject}}</div>
                </div>
                <div class="flex">
                    <div class="handlers" v-if="isShowHandlers" v-on:click.stop="">
                        <i class="fa fa-expand" aria-hidden="true" title="details" v-on:click.stop="detailed"></i>
                        <i class="fa fa-reply" aria-hidden="true" title="Reply" v-on:click.stop="reply"></i>
                        <i class="fa fa-trash-o" aria-hidden="true" title="delete" v-on:click.stop="deleteEmail"></i>
                        <i class="fa fa-envelope-o" aria-hidden="true" v-if="email.isRead" v-on:click.stop="setReadState"></i>
                        <i class="fa fa-envelope-open-o" aria-hidden="true" v-if="!email.isRead" v-on:click.stop="setReadState"></i>
                    </div>
                    <div>{{timeRecieved}}</div>
                </div>
            </div>    
            <div v-else v-on:click="onSelected">
                <div class="flex space-between">
                    <h3>{{email.subject}}</h3>
                    <h3>{{timeRecieved}}</h3>
                </div>
                <h4>{{email.from}}<span>{{email.fromEmail}}</span></h4>
                <p>{{email.body}}</p>
                <div class="handlers" >
                        <i class="fa fa-expand" aria-hidden="true" title="details" v-on:click.stop="detailed"></i>
                        <i class="fa fa-reply" aria-hidden="true" title="Reply" v-on:click.stop="reply"></i>
                        <i class="fa fa-trash-o" aria-hidden="true" title="delete" v-on:click.stop="deleteEmail"></i>
                    </div>
            </div>
            
        </section>
    `,
    data() {
        return {
            selected: false,
            isShowHandlers: false
        }
    },
    methods: {
        setHandlers(val) {
            console.log('inside setHandlers')
            this.isShowHandlers = val;
        },
        onSelected() {
            this.selected = !this.selected;

            if (!this.email.isRead) setTimeout(() => {
                this.email.isRead = true;
                this.$emit('mailread');//to save to storage from the  list
                eventBus.$emit(EVENT_EMAIL_READ)
            }, 2000)

        },
        detailed() {
            var strRout = `emails/details/${this.email.id}`;
            console.log('about to move to detailed view', strRout);
            this.$router.push(strRout);
        },
        reply() {
            var strRout = `/emails/compose/${this.email.id}`;
            console.log('about to move to detailed view', strRout);
            this.$router.push(strRout);
        },
        deleteEmail() {
            // eventBus.$emit(EVENT_EMAIL_DELETE);
            emailService.deleteEmail(this.email.id);
            var strRout = `/emails`;
            this.$router.push(strRout);
        },
        setReadState() {
            this.email.isRead = !this.email.isRead;
            eventBus.$emit(EVENT_EMAIL_READ);
            emailService.saveEmails();
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