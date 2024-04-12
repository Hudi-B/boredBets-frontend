import Cookies from 'js-cookie';

export const apiUrl = 'https://boredbetsapidev.azurewebsites.net/api/';
// export const apiUrl = 'https://localhost:7090/api/';


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

export const phonePrefixes = [
  "+93", "+355", "+213", "+376", "+244", "+1-268", "+54", "+374", "+61", "+43",
  "+994", "+1-242", "+973", "+880", "+1-246", "+375", "+32", "+501", "+229", "+975",
  "+591", "+387", "+267", "+55", "+673", "+359", "+226", "+257", "+238", "+855",
  "+237", "+1", "+236", "+235", "+56", "+86", "+57", "+269", "+242", "+506",
  "+385", "+53", "+357", "+420", "+45", "+253", "+1-767", "+1-809", "+1-829", "+1-849",
  "+593", "+20", "+503", "+240", "+291", "+372", "+268", "+251", "+679", "+358",
  "+33", "+241", "+220", "+995", "+49", "+233", "+30", "+1-473", "+502", "+224",
  "+245", "+592", "+509", "+504", "+36", "+354", "+91", "+62", "+98", "+964",
  "+353", "+972", "+39", "+1-876", "+81", "+962", "+7", "+254", "+686", "+965",
  "+996", "+856", "+371", "+961", "+266", "+231", "+218", "+423", "+370", "+352",
  "+261", "+265", "+60", "+960", "+223", "+356", "+692", "+222", "+230", "+52",
  "+691", "+373", "+377", "+976", "+382", "+212", "+258", "+95", "+264", "+674",
  "+977", "+31", "+64", "+505", "+227", "+234", "+850", "+47", "+968", "+92",
  "+680", "+507", "+675", "+595", "+51", "+63", "+48", "+351", "+974", "+40",
  "+7", "+250", "+1-869", "+1-758", "+1-784", "+685", "+378", "+239", "+966", "+221",
  "+381", "+248", "+232", "+65", "+1-721", "+421", "+386", "+677", "+252", "+27",
  "+82", "+211", "+34", "+94", "+249", "+597", "+46", "+41", "+963", "+886",
  "+992", "+255", "+66", "+670", "+228", "+676", "+1-868", "+216", "+90", "+993",
  "+688", "+256", "+380", "+971", "+44", "+1", "+598", "+998", "+678", "+58",
  "+84", "+967", "+260", "+263"
  ];
