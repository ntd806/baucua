const env = process.env.ENV;
const BASE_URL = process.env.BASE_URL;

export default function getUrl(type) {
  const urlDev = {
    login: `${BASE_URL}/user/login`,
    register: `${BASE_URL}/user/register`,
    profile: `${BASE_URL}/user/get_account`,
    transactionHistory: `${BASE_URL}/user/transfers-history`,
    gameHistory: `${BASE_URL}/user/matches-history`,
    members: `${BASE_URL}/user/get-members`,
    editProfile: `${BASE_URL}/user/post_edit_profile`,
    getConversionRate: `${BASE_URL}/user/get_all_conversion_rate`,
    topUp: `${BASE_URL}/user/post_deposit`,
    blockUser: `${BASE_URL}/user/blockUser`,
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
