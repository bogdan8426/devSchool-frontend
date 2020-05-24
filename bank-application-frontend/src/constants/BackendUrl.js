const api = 'http://localhost:8080';
export const backendUrl = {
  getUserDetails: `${api}/users`,
  register: `${api}/users/register`,
  login: `${api}/login`,
  transactions: `${api}/transactions`,
  sendMoney: `${api}/transactions/send`,
  requestMoney: `${api}/transactions/request`,
  respondToNotification: `${api}/transactions/response`,
};
