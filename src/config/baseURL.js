// export const BASE_URL = 'https://v.yansk.cn';

// export const BASE_URL = 'https://192.168.199.118:3000';

// export const BASE_URL = 'http://www.yansk.top';

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://v.yansk.cn' : 'http://192.168.199.147:3000';