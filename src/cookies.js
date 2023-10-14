import fs from 'fs';

export default {
    getCookie: () => {
      try {
        const cookie = fs.readFileSync('./cookie.txt', 'utf8');
        return cookie;
      } catch (err) {
        return null;
      }
    },
    setCookie: (cookie) => {
      fs.writeFileSync('./cookie.txt', cookie);
    },
  };
  