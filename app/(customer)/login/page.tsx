"use client"

import Image from "next/image";
import {Button, Input} from "antd";
import {Lock, Phone} from "lucide-react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {LoginModel} from "@/models/LoginModel";
import {Api} from "@/app/api/Api";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {logIn} from "@/redux/features/auth-slice";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const route = useRouter()
    const [isLoaging, setIsLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            phone: "",
            passwords: "",
        },
        validationSchema: Yup.object({
            phone: Yup.number().integer("le numéro doit etre un entier").required("le numéro est obligatoire"),
            passwords: Yup.string().required("le mot de passe est obligatoire")
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            const loginLodel = new LoginModel(Number(values.phone), values.passwords);
            const resp = await Api.create("/api/login", loginLodel);
            if(resp) {
                dispatch(logIn(resp.id));
                if(resp.role=="customer") {
                    route.push("/");
                }
                if(resp.role == "provider") {
                    route.push("/provider");
                }
                if(resp.role == "admin") {
                    route.push("/admin");
                }
            }
            else {
                setErrorMsg("L'utilisateur n'existe pas")
                setIsLoading(false)
            }
            setIsLoading(false)
        }
    })
    return(
        <div className={"flex flex-col space-y-5 md:p-20 p-10 items-center justify-center "}>
            <h1 className={"text-center text-[35px]"}>Connectez-vous et <br/> fait Votre réservation</h1>
            <section className={"flex flex-col space-y-10 items-center  md:w-auto"}>
                {/*image*/}
                <div className={"w-auto"}>
                    <Image src={"/icons/logo1.svg"}
                           alt={"login image"}
                           priority={true}
                           width={300}
                           height={300}
                           className={"bg-cover bg-center bg-content "}
                    />
                </div>


                {/*form*/}
                <div className={"w-full flex items-center justify-center"}>
                    <h1>{
                        errorMsg != "" && errorMsg
                    }</h1>
                    <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5 md:w-[350px]"}>
                        <div className={"flex flex-col"}>
                            <label className={formik.touched.phone && formik.errors.phone ? "text-red-600" : ""}>
                                {
                                    formik.touched.phone && formik.errors.phone ? formik.errors.phone: "Numéro de Téléphone"
                                }
                            </label>
                            <Input type={"tel"}
                                   size={"large"}
                                   name={"phone"}
                                   onChange={formik.handleChange}
                                   prefix={<Phone/>}
                                   className={""}
                            />
                        </div>

                        <div className={"flex flex-col"}>
                            <label className={formik.touched.passwords && formik.errors.passwords ? "text-red-600" : ""}>
                                {
                                    formik.touched.passwords && formik.errors.passwords ? formik.errors.passwords : "Mot de Passe"
                                }
                            </label>
                            <Input.Password type={"password"}
                                   name={"passwords"}
                                   size={"large"}
                                   value={formik.values.passwords}
                                   onChange={formik.handleChange}
                                   prefix={<Lock/>}
                                   className={""}
                                   iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>

                        <Button
                            htmlType={"submit"}
                            loading={isLoaging}
                            className={"bg-secondaryColor w-auto"}>
                            Se Connecter
                        </Button>

                        <Link href={"/passwordRecovery"}
                              className={"text-blue-600 text-center"}
                        >
                            Mot de passe oublié
                        </Link>

                        <h1 className={"text-center"}>Vous n'avez pas de compte? <Link href={"/registre"} className={"text-blue-600"}>Creer un compte</Link> </h1>



                    </form>
                </div>
            </section>
            </div>
    );
}
export default Login;