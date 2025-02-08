import Config from 'react-native-config';

const ENV = {
  development: {
    API_KEY: Config.API_KEY,
    BASE_URL: Config.BASE_URL,
  },
  production: {
    API_KEY: Config.PROD_API_KEY,
    BASE_URL: Config.PROD_BASE_URL,
  },
};

const getEnv = () => {
  const env = Config.USE_DEV === 'true' ? 'development' : 'production';
  return ENV[env];
};

export default getEnv();
