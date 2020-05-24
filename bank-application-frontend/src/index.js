import { BaWelcome } from './BaWelcome';
import './BaWelcome';
import './authentication/Login.js';
import './authentication/Register.js';
import './content/Dashboard';
import './content/Deposit';
import './content/SendMoney';
import './content/RequestMoney';
import './content/ViewTransactions';
import './content/Balance';

window.customElements.define('ba-welcome', BaWelcome);

// const outlet = document.querySelector('slot');
// export const router = new Router(outlet);
// router.setRoutes([
//   { path: '/', component: 'ba-welcome' },
//   { path: '/login', component: 'ba-login' },
//   { path: '/register', component: 'ba-register' },
//   { path: '/dashboard', component: 'ba-dashboard' },
//   { path: '/transactions/send', component: 'ba-send-money' },
//   { path: '/transactions/request', component: 'ba-request-money' },
//   { path: '/transactions', component: 'ba-view-transactions' },
//   { path: '(.*)', component: 'ba-not-found' },
// ]);
