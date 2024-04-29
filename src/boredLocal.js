import Cookies from 'js-cookie';

export const apiUrl = 'https://boredbetsapidev.azurewebsites.net/api/';
//export const apiUrl = 'https://localhost:7090/api/';
 
export const secondaryColor = 'rgb(50,71,101)';

export function setCookieToken(type, token) {
    const inOneHour = new Date( new Date().getTime() + 60 * 60 * 1000 );
    const tokenType = type ? 'accessToken' : 'refreshToken';
    const tokenExpiration = type ? inOneHour : 7;
  
    Cookies.set(tokenType, token, {
      expires: tokenExpiration
    })
  }
export function clearCookies() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
