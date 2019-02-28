import utilService from '../../../services/util-service.js';

export default {
    loadEmails,
    getReadEmailsCounter,
    saveEmails,
    SendMail,
    getEmailById
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


    return emails;
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

function getReadEmailsCounter() {

    var readCounter = 0;
    if (!emails || emails.length === 0) return 0;

    emails.forEach(email => {
        if (email.isRead) readCounter++
    });
    return readCounter;
}

function SendMail(email) {

    email.sendAt = Date.now();

    // setTimeout(() => {
    if (!email) return;

    emails.push(email);
    utilService.saveToStorage(EMAIL_LIST_KEY, emails);
    console.log('email added to emails. email:', email)
    // }, 1500);
}

function getEmailById(id) {
    return emails.find(email => {return email.id === id });
}














