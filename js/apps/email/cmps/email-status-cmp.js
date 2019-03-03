
export default {
    name:'email-status',
    props:['status'],
    template:`<section class="email-indicator">
                <span class="emails-total">{{status.total}}</span>
                <span class="emails-read">{{status.unread}}</span>
              </section>
    `,
    created(){
        console.log('email indicator created..')
    }
}