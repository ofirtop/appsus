import utilService from '../../../services/util-service.js';

export default {
    loadEmails
}
var gNextId = 1;

const EMAIL_LIST_KEY = 'emailList';
const ID_LENGTH = 5;

function loadEmails() {
    var emails = utilService.loadFromStorage(EMAIL_LIST_KEY);

    if (!emails || emails.length === 0) {
        emails = [];
        for (let index = 0; index < 6; index++) {
            emails.push(_createEmail());
        }
        utilService.saveToStorage(EMAIL_LIST_KEY,emails);
    }
    return emails;
}

function _createEmail() {
    return {
        id: gNextId++,
        subject: 'this is message ' + utilService.makeId(8),
        body: 'lorem skjdhf klsj ldkjl dlvkjldfkbvkdjvl kjf lsjd lbxv kbxjzvhdbslv dbslv jhbxv dbxzjlabsdjbvhsjlbvhjladsbvldsjbv sjDBvlxhjzbcvjl ablrkj;bgfds:KJB CVAWJsjzvx.cnb dbvx db',
        isRead: false,
        sendAt: Date.now(),
        from: 'Ofir',
        fromEmail:'ofir@gmail.com', 
        to: 'Hagar',
        toEmail:'hagar@gmail.com'
    }
}