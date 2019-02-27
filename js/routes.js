import appsusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-page.js';
import noteApp from './apps/notes/pages/notes-app-page.js';

const routes = [
    { path: '/', component: appsusHome },
    { path: '/emails', component: emailApp },
    { path: '/notes', component: noteApp },
]

export default routes;