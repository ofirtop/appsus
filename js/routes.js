import appsusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-page.js';
import noteApp from './apps/notes/pages/notes-app-page.js';
import emailList from '../js/apps/email/cmps/email-list-cmp.js';
import emailCreate from '../js/apps/email/pages/email-create-page.js';
import emailDetails from '../js/apps/email/pages/email-details-page.js';

const routes = [
    { path: '/', component: appsusHome },
    { path: '/emails', component: emailApp, children: [
            { path: '', component: emailList },
            { path: 'compose/:id?', component: emailCreate },
            { path: 'details/:id',component: emailDetails}
        ]
    },
    { path: '/notes/:noteId?', component: noteApp }  
]

export default routes;