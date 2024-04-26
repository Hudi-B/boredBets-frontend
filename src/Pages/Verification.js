import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiUrl } from '../boredLocal';
import axios from 'axios';
export default function VerificationPage() {
    let { verificationCode, userId } = useParams();
    const [dots, setDots] = useState('.');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);  
    useEffect(() => {
        const intervalId = setInterval(() => {
        if (!error && !success) {
            setDots((prevDots) => {
            switch (prevDots) {
                case '.':
                return '..';
                case '..':
                return '...';
                case '...':
                return '.';
                default:
                return '.';
            }
            });
        }
        }, 500);

    return () => clearInterval(intervalId);
  }, [error]);

  useEffect(() => {
    if (verificationCode && userId) {
      axios.get(apiUrl + 'User/VerificationCodeCheck?UserId=' + userId + '&VerificationCode=' + verificationCode)
        .then((response) => {
          setSuccess(true);
        })
        .catch((error) => {
            setError(true);
        })
        .finally(() => {
            setTimeout(() => {
                window.location.href = 'https://bored-bets.vercel.app';
              }, 2000);
        });
    }
  }, [verificationCode, userId]);


  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column', width: '100vw', minHeight: '100vh', paddingInline: '50px' }}>
    {error? 
        <><div style={{ fontSize: '50px', width: '100%', textAlign: 'center' }}>An error occured during verification</div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop: '20px', fontSize: '20px'}}>  
        <div style={{color:'transparent'}} >{dots}</div> 
            <div>You will be redirected shortly {dots}</div>
        </div></>    
        :
        success?
            <><div style={{ fontSize: '50px', width: '100%', textAlign: 'center' }}>User successfully verified</div>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop: '20px', fontSize: '20px'}}>  
            <div style={{color:'transparent'}} >{dots}</div> 
                <div>You will be redirected shortly {dots}</div>
            </div></>
            :
            <><div style={{ fontSize: '50px', width: '100%', textAlign: 'center' }}>This page will automatically close.</div>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop: '20px', fontSize: '20px'}}>  
                <div style={{color:'transparent'}} >{dots}</div> 
                <div>Currently verifying your account {dots}</div>
            </div></>
    }
</div>);
}
