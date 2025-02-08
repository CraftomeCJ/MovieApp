import Config from 'react-native-config';

const ENV = {
  development: {
    API_KEY: Config.API_KEY || '77545170d233541d9c56f99a85dcc14c',
    BASE_URL: Config.BASE_URL || 'https://api.themoviedb.org/3',
  },
  production: {
    API_KEY: Config.PROD_API_KEY,
    BASE_URL: Config.PROD_BASE_URL,
  },
};

// const getEnv = () => {
//   const env = Config.USE_DEV === 'true' ? 'development' : 'production';
//   return ENV[env];
// };
const getEnv = () => {
  const env = true;
  return ENV[env ? 'development' : 'production'];
};

export default getEnv();
