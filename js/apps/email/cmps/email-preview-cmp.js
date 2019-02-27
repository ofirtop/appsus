
export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            
            <div class="flex space-between" v-on:click="onSelected" v-if="!selected" >
                <div>{{email.from}}</div>
                <div>{{email.subject}}</div>
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
        </section>
    `,
    data(){
        return{
            selected:false
        }
    },
    methods: {
        pad(n) {
            return n < 10 ? '0' + n : n;
        },
        onSelected(){
            this.selected = !this.selected;
        }
    },
    computed: {
        timeRecieved() {
            // debugger
            var h = new Date(this.email.sendAt).getHours();
            h += 2; //offset
            var m = new Date(this.email.sendAt).getMinutes();
            return this.pad(h) + ':' + this.pad(m);
        }
    },
    created(){
      console.log('email preview created')  
    },
    name: 'email-preview'
}