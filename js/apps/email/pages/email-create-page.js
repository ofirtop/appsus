import emailService from '../services/email-service-cmp.js';
export default {
    template: `
        <section class="email-create flex-col">
            <form @submit.prevent="sendEmail">
                <div class="email-create-header">New Message</div>
                <div>
                    <span>To</span>
                    <input type="text" :value="email.to">
                        
                </div>
                <input type="text" placeholder="Subject:" v-model="email.subject">
                <textarea v-model.trim="email.body"></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    `,
    components: {
        emailService
    },
    data() {
        return {
            email: {
                id: null,
                subject: '',
                body: '',
                isRead: false,
                sendAt: null,
                from: 'Ofir',
                fromEmail: 'ofir@gmail.com',
                to: 'Hagar',
                toEmail: 'hagar@gmail.com'
            }
        }
    },
    methods: {
        sendEmail() {
            console.log('about to send email', this.email);
            emailService.SendMail(this.email);
            console.log(this);
            this.$router.push('/emails');
        }
    },
    created() {
        if (this.$route.params.id) {
            var email = emailService.getEmailById(+this.$route.params.id);
            this.email.subject = `Re: ${email.subject}`;
        }

    },
    name: 'email-create'
}