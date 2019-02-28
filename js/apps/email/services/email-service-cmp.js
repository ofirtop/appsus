import utilService from '../../../services/util-service.js';

export default {
    loadEmails,
    getUnReadEmailsCounter,
    saveEmails,
    SendMail,
    getEmailById,
    deleteEmail
}
var gNextId = 1;

const EMAIL_LIST_KEY = 'emailList';
const ID_LENGTH = 5;
var emails = null;

function loadEmails() {
    emails = utilService.loadFromStorage(EMAIL_LIST_KEY);

    if (!emails || emails.length === 0) {
        emails = [];
        for (let index = 0; index < 6; index++) {
            emails.push(_createEmail());
        }
        utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    }
    return emails.sort((a, b) => {
        a = new Date(a.sendAt);
        b = new Date(b.sendAt);
        return a > b ? -1 : a < b ? 1 : 0;
    });
}

function saveEmails() {
    utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    console.log('emailService, emails saved')
}

function _createEmail() {
    return {
        id: gNextId++,
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

    email.sendAt = Date.now();

    // setTimeout(() => {
    if (!email) return;
    email.id = gNextId++
    emails.push(email);
    utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    console.log('email added to emails. email:', email)
    // }, 1500);
}
function deleteEmail(id){
    if(id){
        debugger
        var idx = emails.findIndex(email =>{return email.id === id});
        emails.splice(idx,1);
    }
}
function getEmailById(id) {
    return emails.find(email => { return email.id === id });
}














