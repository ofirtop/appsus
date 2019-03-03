import appsusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-page.js';
import noteApp from './apps/notes/pages/notes-app-page.js';
import noteEdit from './apps/notes/pages/note-edit-page.js';
import emailList from '../js/apps/email/cmps/email-list-cmp.js';
import emailCompose from '../js/apps/email/cmps/email-compose-cmp.js';

const routes = [
    { path: '/', component: appsusHome },
    { path: '/emails', component: emailApp, children: [
            { path: '', component: emailList },
            { path: 'compose', component: emailCompose }
        ]
    },
    { path: '/notes', component: noteApp },
    { path: '/notes/:noteId', component: noteEdit },
    
]

export default routes;