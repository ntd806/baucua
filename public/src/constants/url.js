const env = process.env.ENV;
const BASE_URL = process.env.BASE_URL;

export default function getUrl(type) {
  const urlDev = {
    login: `${BASE_URL}/api/user/login`,
    register: `${BASE_URL}/api/user/register`,
    profile: `${BASE_URL}/api/user/get_account`,
    transactionHistory: `${BASE_URL}/api/user/transfers-history`,
    gameHistory: `${BASE_URL}/api/user/matches-history`,
    members: `${BASE_URL}/api/user/get-members`,
    editProfile: `${BASE_URL}/api/ser/post_edit_profile`,
    getConversionRate: `${BASE_URL}/api/user/get_all_conversion_rate`,
    topUp: `${BASE_URL}/api/user/post_deposit`,
    lockUser: `${BASE_URL}/api/user/blockUser`,
    settings: `${BASE_URL}/api/user/setting`,
    updateSetting: `${BASE_URL}/api/user/update-setting`,
    getUsersHistory: `${BASE_URL}/api/user/get-user-history`,
    adminLogin: `${BASE_URL}/api/admin/login`,
    addOption: `${BASE_URL}/api/user/create-setting`,
    addConversionRate: `${BASE_URL}/api/user/create-conversion_rates`,
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
