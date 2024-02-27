import Cookies from 'js-cookie';

export const apiUrl = 'https://boredbetsapi.azurewebsites.net/api/';

export function setCookieToken(type, token) {
    const inOneHour = new Date( new Date().getTime() + 60 * 60 * 1000 );
    const tokenType = type ? 'accessToken' : 'refreshToken';
    const tokenExpiration = type ? inOneHour : 7;
  
    Cookies.set(tokenType, token, {
      expires: tokenExpiration
    })
  }
