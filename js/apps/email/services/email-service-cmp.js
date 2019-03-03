import utilService from '../../../services/util-service.js';
import {eventBus,EVENT_EMAIL_DELETE, EVENT_EMAIL_ADD} from '../../../event-bus.js';

export default {
    loadEmails,
    getUnReadEmailsCounter,
    saveEmails,
    SendMail,
    getEmailById,
    getTotalEmailcount,
    deleteEmail
}

const EMAIL_LIST_KEY = 'emailList';
const ID_LENGTH = 10;
var emails = null;

var isMailIntervalStart = false;

function loadEmails() {
    emails = utilService.loadFromStorage(EMAIL_LIST_KEY);

    if (!emails || emails.length === 0) {
        emails = [];
        for (let index = 0; index < 6; index++) {
            emails.push(_createEmail());
        }
        utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    }

    //start sending mail in intervals 
    if(!isMailIntervalStart){
        isMailIntervalStart = !isMailIntervalStart;
        setInterval(() => {
            _AddEmail();
        },utilService.getRandomIntInclusive(40000,120000));
    }
    return emails;
}

function _AddEmail(){
    var mail = _createEmail();
    var joke = _getJoke();
    mail.subject = joke.subject;
    mail.body = joke.body;
    SendMail(mail);
}

function saveEmails() {
    utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    console.log('emailService, emails saved')
}

function _createEmail() {
    return {
        id: utilService.makeId(ID_LENGTH),
        subject: 'this is message ' + utilService.makeId(8),
        body: 'lorem skjdhf klsj ldkjl dlvkjldfkbvkdjvl kjf lsjd lbxv kbxjzvhdbslv dbslv jhbxv dbxzjlabsdjbvhsjlbvhjladsbvldsjbv sjDBvlxhjzbcvjl ablrkj;bgfds:KJB CVAWJsjzvx.cnb dbvx db',
        isRead: false,
        sendAt: Date.now(),
        from: 'Ofir',
        fromEmail: 'ofir@gmail.com',
        to: 'Hagar',
        toEmail: 'hagar@gmail.com'
    }
}

function getUnReadEmailsCounter() {
    var unReadCounter = 0;
    if (!emails || emails.length === 0) return 0;

    emails.forEach(email => {
        if (!email.isRead) unReadCounter++
    });
    return unReadCounter;
}

function SendMail(email) {
    if (!email) return;
    if(!email.sendAt) email.sendAt = Date.now();
    if(!email.id) email.id = utilService.makeId(ID_LENGTH);

    emails.push(email);
    utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    eventBus.$emit(EVENT_EMAIL_ADD);
}

function deleteEmail(id) {
    if (id) {
        var idx = emails.findIndex(email => { return email.id === id });
        emails.splice(idx, 1);
        utilService.saveToStorage(EMAIL_LIST_KEY, emails);
        
        eventBus.$emit(EVENT_EMAIL_DELETE);
    }
}

function getEmailById(id) {
    return emails.find(email => { return email.id === id });
}

function getTotalEmailcount(){
    return emails.length;
}

var jokes = null;
function _getJoke() {
    if (!jokes) {
        jokes = [
            { subject: 'BIG SPENDER', body: 'I had my credit card stolen the other day but I didn’t bother to report it because the thief spends less than my wife.' },
            { subject: 'SHOPPING FREEZE', body: 'I’m currently boycotting any company that sells items I can’t afford.' },
            { subject: 'INNOCENT CUSTOMER', body: `That awkward moment when you leave a store without buying anything and all you can think is act natural, you’re innocent.` },
            { subject: 'HOT NEW DIET', body: 'I gave up jogging for health reasons. My thighs kept rubbing together and setting my pantyhose on fire.—Judy Franconi' },
            { subject: 'SUGAR-FREE', body: 'Q: What do you call someone who can’t stick with a diet?A: A desserter.' },
            { subject: 'LEARNING ABOUT LETTERS', body: `I would like vitamins for my son, a mother said. Vitamin  A, B or C? the pharmacist asked. It doesn’t matter, the mother replied. He can’t read yet.` },
            { subject: 'KEYWORDS ARE EVERYWHERE', body: 'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol' },
            { subject: 'IT AIN’T DUFF.', body: 'Q: What’s Homer Simpson’s least favorite style of beer? A: Flanders Red Ale.' },
            { subject: 'THE HUNTER’S BIRTHDAY', body: 'What do you get a hunter for his birthday? A birthday pheasant' },
            { subject: 'BIRTHDAY CLAM', body: 'I had my credit card stolen the other day but I didn’t bother to report it because the thief spends less than my wife.' },
            { subject: 'THE HARD BIRTHDAY CAKE', body: 'Why was the birthday cake as hard as a rock? Because it was marble cake!' },
            { subject: 'YOU’RE NOT WRONG…', body: 'ER DOCTOR: So, what brings you here? PATIENT: An ambulance! What do you think?!' },
            { subject: 'NO BEDSIDE MANNER', body: `I’d never had surgery, and I was nervous. This is a very simple, noninvasive procedure, the anesthesiologist reassured me. I felt better, until … Heck, he continued, you have a better chance of dying from the anesthesia than the surgery itself.` },
            { subject: 'MY SON’S #1 CONCERN', body: `When my three-year-old was told to pee in a cup at the doctor’s office, he unexpectedly got nervous. With a shaking voice, he asked, Do I have to drink it?` },
            { subject: 'BAD BURGLARS DO THIS', body: `While on patrol, I arrested a burglar who’d injured himself running from a home. He told me he’d broken in and unhooked the phone before searching for valuables. But he’d panicked when he heard a woman’s voice. I entered the house and heard the same voice: If you’d like to make a call, please hang up and try your call again.` }
        ]
    }
    return jokes[utilService.getRandomIntInclusive(0, 14)]
}

