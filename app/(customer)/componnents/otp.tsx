"use client"

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {app} from "@/app/config";

export default function Otp() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<any>();
    const [otpSent, setOtpSent] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        // @ts-ignore
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container",
            {
                'size': 'normal',
                'callback': (response: any) => {
                },
                'expired-callback': () => {

                }
            })
    }, [auth]);

    //recuperer le numero du formumaire
    const handlePhoneNumberChange = (e: any) => {
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e: any) => {
        setOtp(e.target.value);
    };

    //function to send otp to number
    const handleSendOtp = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            // @ts-ignore
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setPhoneNumber('');
            alert('OTP HAS BEEN SENT');
        } catch (error) {
            console.error(error);
        }
    }

    //function to confirm otp
    const handleOtpSubmit = async () => {
        try {
            await confirmationResult.confirm(otp);
            setOtp('');
            router.push('/');
        } catch (error) {
            console.error(error)
        }
    }



}