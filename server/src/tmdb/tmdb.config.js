const baseUrl = process.env.TBDB_BASE_URL;
const key = process.env.TBDB_KEY;

/**
 * Create a module to build URLs for The Movie Database (TMDb) API by using baseUrl, key, and provided params.
 * @param {*} endpoint
 * @param {*} params
 * @returns url
 */
const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
