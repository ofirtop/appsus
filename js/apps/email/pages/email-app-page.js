import emailList from '../cmps/email-list-cmp.js'
import emailService from '../services/email-service-cmp.js';

export default {
    template: `
        <section class="email-app">
            <email-list :emails="emails"></email-list>
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