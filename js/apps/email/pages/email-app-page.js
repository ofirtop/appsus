import emailList from '../cmps/email-list-cmp.js'
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
        <section class="email-app flex">
            <div>
                <div>
                    <router-link to="/compose">Compose</router-link>
                </div>
                <div>
                    <router-link to="/inbox">Inbox</router-link>
                </div>
            </div>
            <!-- <email-list :emails="emails"></email-list> -->
            <router-view :emails="emails"></router-view>
        </section> 
    `,
    data(){
        return{
            emails:null
        }
    },
    components:{
        emailList,
        emailService
    },
    created(){
        this.emails = emailService.loadEmails();
        console.log('email app got emails: ',this.emails);
        
        
    },
    name:'email-app'
}