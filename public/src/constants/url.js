const env = process.env.ENV;
const BASE_URL = process.env.BASE_URL;

export default function getUrl(type) {
  const urlDev = {
    login: `${BASE_URL}/user/login`,
    register: `${BASE_URL}/user/register`,
    profile: `https://5ffdb3f7d9ddad0017f6867b.mockapi.io/profile`, //${BASE_URL}/user/profile`,
    transactionHistory: `${BASE_URL}/user/transfers-history`,
    gameHistory: `${BASE_URL}/user/matches-history`,
    members: `${BASE_URL}/user/get-members`,
  };
  const urlProd = {
    login: 'https://600286dd4f17c800175580c3.mockapi.io/login',
    register: 'https://600286dd4f17c800175580c3.mockapi.io/login',
    profile: 'https://5ffdb3f7d9ddad0017f6867b.mockapi.io/profile',
    transactionHistory: 'https://5ffdb3f7d9ddad0017f6867b.mockapi.io/transaction',
    gameHistory: 'https://5ffdb3f7d9ddad0017f6867b.mockapi.io/game',
    members: 'https://5ffdb3f7d9ddad0017f6867b.mockapi.io/member',
  };
  if (env === 'Prod') {
    return urlProd[type];
  }
  return urlDev[type];
}