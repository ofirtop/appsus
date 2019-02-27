import emailList from '../cmps/email-list-cmp.js'

export default {
    template: `
        <section class="email-app">
            <email-list></email-list>
        </section> 
    `,
    components:{
        emailList
    },
    name:'email-app'
}