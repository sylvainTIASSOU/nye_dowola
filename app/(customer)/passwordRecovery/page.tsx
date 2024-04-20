"use client"

import {useRouter} from "next/navigation";
import { Button, Input } from "antd";
import {Lock, Phone} from "lucide-react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {Api} from "@/app/api/Api";
import {getAuth, signInWithPhoneNumber} from "@firebase/auth";
import {app} from "@/app/config";
import {useToast} from "@/components/ui/use-toast";
import { RecaptchaVerifier } from "firebase/auth";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {UserModel} from "@/models/UserModel";


const PasswordRecovery = () => {
    const [phone, setPhone] = useState('');
    const [phoneVisibility, setPhoneVisibility] = useState(false);
    const [otpVisibility, setOtpVisibility] = useState(true);
    const [passVisibility, setPassVisibility] = useState(true);
    const [error, setError] = useState("");
    const [otpValide, setOtpValide] = useState("");
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<any>();
    const [otpSent, setOtpSent] = useState(false);
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const { toast } = useToast();
    const auth = getAuth(app);
    const router = useRouter();

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        /*const initializeRecaptchaVerifier = async () => {
            if (typeof window !== undefined) {
                // @ts-ignore
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha_container",
                    {
                        'size': 'normal',
                        'callback': (response: any) => {
                        },
                        'expired-callback': () => {

                        }
                    })
            }
        }

        initializeRecaptchaVerifier();*/

    }, [auth]);



    const formikPhone = useFormik({
        initialValues: {
            phone: ""
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("Votre numéro de téléphone est obligatoire.")
        }),
         onSubmit: async (values) => {
            setPhoneLoading(true)
             const resp = await Api.create("/api/phoneVerification", Number(values.phone));

             if(resp.ok) {
                 const number = `+228${values.phone}`;
                 setUser(resp.user);
                try {
                     const formattedPhoneNumber = `+${number.replace(/\D/g, '')}`;
                   //  console.log(formattedPhoneNumber);
                         // @ts-ignore
                       const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber);


                        // @ts-ignore
                     setConfirmationResult(confirmation);
                     setOtpSent(true);
                     toast({
                         title: "Un code de 6 chiffres a été envoyer a ce numéro"
                     });
                     setPhoneVisibility(true);
                     setOtpVisibility(false)
                 } catch (error) {
                     toast({
                         title: "Une erreur est survenu lors de l'envoie du code",
                         variant: "destructive",
                     });
                     console.error(error);
                    setPhoneLoading(false);
                 }
                 finally {
                     setPhoneLoading(false);
                 }

             }
             else {
                 console.error("not found");

                 setPhoneLoading(false)
                 toast({
                     title:"Le numéro de téléphone n'existe pas",
                     variant: "destructive"
                 });
             }
             setPhoneLoading(false);
         }
    })

    const formikOtp = useFormik({
        initialValues: {
            otp: "",
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
        },
        validationSchema: Yup.object({
            otp: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),
            otp1: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),
            otp2: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),
            otp3: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),
            otp4: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),
            otp5: Yup.number().integer("Entrer un code valide.").required("Le code est obligatoire."),

        }),
        onSubmit: async (values) => {
            setOtpLoading(true)
            const otps = `${values.otp}${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}`
            setOtp(otps)
            try {
                await confirmationResult.confirm(otp);
                setOtp('');
                setOtpVisibility(true)
                setPassVisibility(false)
            } catch (error) {
                toast({
                    title: "Le code saisi n'est pas corecte",
                    variant: "destructive",
                });
                console.error(error)
            }
            finally {
                setOtpLoading(false)
            }
            setOtpLoading(false)
        }
    })

    const formikPassword = useFormik({

        initialValues: {
            passwords: "",
            passwords1: ""
        },
        validationSchema: Yup.object({
            passwords: Yup.string().required("le mot de passe est obligatoire"),
            passwords1: Yup.string().required("le mot de passe est obligatoire"),
        }),
        onSubmit: async (values) => {
            setPassLoading(true)
            if (values.passwords == values.passwords1) {
                const userModel = new UserModel(String(user?.lastName), String(user?.firstName), String(user?.email), values.passwords, String(user?.role), Number(user?.phone), String(user?.address), String(user?.imageUrl), user?.isVisible, user?.isActive)
                const resp = await Api.update(`/api/user/${String(user?.id)}`, userModel)
                if(resp) {
                    toast({
                        title: "Votre mot de passe a été changer avec succès"
                    })
                    router.push('/login');
                }
                else {
                    toast({
                        title: "Une erreur est survenue lors de la mise a jours du mot de passe",
                        variant: "destructive",
                    });
                    setPhoneVisibility(false)
                }

            }
            else {
                setError('Les mots de passe ne sont pas conforment.');
                setPhoneVisibility(false)
            }

            setPassLoading(false);
        }
    })


    return(
        <div className={"flex flex-col space-y-5 md:p-20 p-10 items-center justify-center "}>
            <section className={"w-auto flex flex-col md:flex-row md:justify-between md:content-between"}>
                {/*image*/}
                <div className={"w-auto flex items-center"}>
                    <Image src={"/illustration/forget_light.png"}
                           alt={"login image"}
                           priority={true}
                           width={400}
                           height={400}
                           className={"bg-cover bg-center bg-content "}
                    />
                </div>

                <div className={" w-[400px] flex  items-center"}>
                    <form onSubmit={formikPhone.handleSubmit} className={phoneVisibility ? "hidden":"w-full items-center justify-center  flex-col"}>
                        <h1 className={"text-[25px] font-bold mb-3"}>
                            Perdu dans le cyberespace ?
                            Nous vous ramènerons sur pied.
                            Indiquez votre numéro de téléphone pour
                            démarrer le processus de récupération
                            de votre compte.


                        </h1>

                        <label className={"text-red-600"}>
                            {
                                formikPhone.touched.phone && formikPhone.errors.phone && formikPhone.errors.phone
                            }
                        </label>
                        <div>
                            <label>Entrer votre numéro de téléphone</label>
                            <Input type={"text"}
                                   prefix={<Phone/>}
                                   value={formikPhone.values.phone}
                                   name={"phone"}
                                   onChange={formikPhone.handleChange}
                                   placeholder={"ex:90000000"}
                                   className={""}
                            />
                        </div>


                        <Button htmlType={"submit"} loading={phoneLoading} className={"bg-primaryColor mt-3"} >
                            Continué
                        </Button>

                        <div id={'recaptcha_container'}>

                        </div>
                    </form>

                    <form onSubmit={formikOtp.handleSubmit} className={otpVisibility ? "hidden":"w-full "}>
                        <h1 className={"text-[20px] font-bold my-3"}>
                            Entrer le code a 6 chiffres que vous venez de recevoir sur votre numéro
                            et continué.
                        </h1>

                        <h1 className={"font-bold my-3 text-red-600"}>{
                            otpValide !="" && otpValide
                        }</h1>

                        <label className={"text-red-600"}>
                            {
                                formikOtp.touched.otp && formikOtp.errors.otp && formikOtp.errors.otp
                            }
                        </label>

                        <div className={"flex space-x-3"}>
                            <Input type={"tel"} name={"otp"} value={formikOtp.values.otp} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1} />
                            <Input type={"tel"} name={"otp1"} value={formikOtp.values.otp1} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1}/>
                            <Input type={"tel"} name={"otp2"} value={formikOtp.values.otp2} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1}/>
                            <Input type={"tel"} name={"otp3"} value={formikOtp.values.otp3} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1}/>
                            <Input type={"tel"} name={"otp4"} value={formikOtp.values.otp4} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1}/>
                            <Input type={"tel"} name={"otp5"} value={formikOtp.values.otp5} onChange={formikOtp.handleChange} className={"w-[40px]  h-[40px]"} minLength={1} maxLength={1}/>

                        </div>


                        <Button htmlType={"submit"}  loading={otpLoading} className={"bg-primaryColor mt-3"} >
                            Continuer
                        </Button>
                    </form>

                    <form onSubmit={formikPassword.handleSubmit}
                          className={passVisibility ? "hidden" : "w-full flex flex-col space-y-5"}>
                        <h1 className={"text-[30px] font-bold my-3"}>
                            Réinitialiser le mot de passe.


                        </h1>

                        <h1 className={"text-[18px] text-red-600 font-bold mb-2"}>
                            {
                                error!="" && error
                            }
                        </h1>
                        <div className={"flex flex-col"}>
                            <label className={formikPassword.touched.passwords && formikPassword.errors.passwords ? "text-red-600" :""}>
                                {
                                    formikPassword.touched.passwords && formikPassword.errors.passwords ? formikPassword.errors.passwords : "Entrer le nouveau mot de passe"
                                }
                            </label>

                            <Input.Password type={"password"}
                                            placeholder={"Entrer le code a 6"}
                                            className={""}
                                            name={"passwords"}
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.passwords}
                                            prefix={<Lock/>}
                                            iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}
                                            minLength={8}
                                            pattern="(?=.*[a-zA-Z])(?=.*\d).{8,}"
                                            required
                                            title="Le mot de passe doit contenir au moins une lettre un chiffre et un caractaire."


                            />
                        </div>

                        <div className={"flex flex-col"}>
                            <label className={formikPassword.touched.passwords1 && formikPassword.errors.passwords1 ? "text-red-600" :""}>
                                {
                                    formikPassword.touched.passwords1 && formikPassword.errors.passwords1 ? formikPassword.errors.passwords1 : "Confirmer le mot de passe"
                                }

                            </label>

                            <Input.Password type={"password"}
                                            placeholder={"Entrer le code a 6"}
                                            className={""}
                                            name={"passwords1"}
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.passwords1}
                                            prefix={<Lock/>}
                                            iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}

                            />
                        </div>

                        <Button htmlType={"submit"} loading={passLoading} className={"bg-primaryColor mt-3"}>
                            Validé
                        </Button>

                    </form>

                </div>

            </section>


        </div>
    );
}
export default PasswordRecovery;