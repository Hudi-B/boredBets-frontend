import Cookies from 'js-cookie';
import moment from 'moment';

export const apiUrl = 'https://boredbetsapidev.azurewebsites.net/api/';
//export const apiUrl = 'https://localhost:7090/api/';
 
export const secondaryColor = 'rgb(50,71,101)';

export const fontColor = 'rgb(220,220,220)';

export function FormatDate(rawDate)
{
  return moment.utc(rawDate).local().format('YYYY-MM-DD HH:mm');  
} 

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
