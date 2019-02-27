import utilService from '../../../services/utils-service.js';
import utilsService from '../../../services/utils-service.js';

export default {
    loadEmails
}
var gNextId = 1;

const EMAIL_LIST_KEY = 'emailList';
const ID_LENGTH = 5;

function loadEmails() {
    var emails = utilsService.loadFromStorage(EMAIL_LIST_KEY);

    if (!emails || emails.length === 0) {
        emails = [];
        for (let index = 0; index < 6; index++) {
            emails.push(_createEmail());
        }
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
        From: 'Ofir',
        To: 'Hagar'
    }
}