// casaca-front/src/config.js
// This file safely gets environment variables for use anywhere in your app


const config = {
  strapiApiUrl: import.meta.env.VITE_APP_STRAPI_API_URL,
  strapiApiToken: import.meta.env.VITE_APP_STRAPI_API_TOKEN,
};

export default config;