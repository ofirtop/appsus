
export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <div class="flex space-between">
                <h3>{{email.subject}}</h3>
                <h3>{{timeRecieved}}</h3>
            </div>
            <h4>{{email.from}}<span>{{email.fromEmail}}</span></h4>
            <p>{{email.body}}</p>
        </section>
    `,
    methods: {
        pad(n) {
            return n < 10 ? '0' + n : n;
        }
    },
    computed: {
        timeRecieved() {
            // debugger
            var h = new Date(this.email.sendAt).getHours();
            h+=2; //offset
            var m = new Date(this.email.sendAt).getMinutes();
            return this.pad(h) + ':' + this.pad(m);
        }
    },
    name: 'email-preview'
}