"use client"
import Image from "next/image";
import {Button, Input} from "antd";
import {Lock, LucideMail, Map, Phone, User} from "lucide-react";
import Link from "next/link";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {LoginModel} from "@/models/LoginModel";
import {Api} from "@/app/api/Api";
import type {RadioChangeEvent} from 'antd';
import {Radio} from 'antd';
import {UserModel} from "@/models/UserModel";
import {useRouter} from "next/navigation";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useToast} from "@/components/ui/use-toast";

const Registre = () => {
    const [value, setValue] = useState("customer");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast }  = useToast();
    const route = useRouter();
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            email: "",
            passwords: "",
            passwords2: "",
            phone: "",
            address: "",
        },
        validationSchema: Yup.object({
            lastName: Yup.string().required("votre nom est obligatoire"),
            firstName: Yup.string().required("votre prénom est obligatoire"),
            email: Yup.string().required("votre email est obligatoire").email("enter un email valide"),
            passwords: Yup.string().required("votre mot de passe est obligatoire"),
            passwords2: Yup.string().required("votre mot de passe est obligatoire"),
            phone: Yup.number().integer("enter un numéro valide").required("votre numéro est obligatoire"),
            address: Yup.string().required("votre addresse est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            if (values.passwords == values.passwords2) {
                const userModel = new UserModel(values.lastName, values.firstName, values.email, values.passwords, value, Number(values.phone), values.address, "", true, true);

                const resp = await Api.create("/api/user", userModel);
                if(resp) {
                    toast({
                        title: "Vous vous ete inscrit avec succès."
                    });
                    route.push("/login");
                }
                else {
                    setErrorMsg("Une erreur est survenu lors de l'enregistrement. reéssayer!!");
                    setIsLoading(false)
                }

            } else {
                setErrorMsg("les mots de passe ne sont pas conformes");
                setIsLoading(false);
            }
            setIsLoading(false);

        }
    })

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };


    return (
        <div className={"flex flex-col space-y-5 md:p-20 p-10 items-center justify-center "}>
            <h1 className={"text-[35px] text-center"}>Creer un compte gratutement <br/> et fait partie de notre
                platforme</h1>

            <section className={""}>
                {/*image*/}

                {/*form*/}
                <div className={"w-full flex flex-col space-y-5 items-center justify-center"}>
                    <h1 className={"text-center text-red-600 text-[20px]"}>
                        {
                            errorMsg!="" && errorMsg
                        }
                    </h1>
                    <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5 md:w-[500px]"}>

                        {/*names */}
                        <div className={"flex flex-col space-y-3 md:flex-row md:space-x-3  md:space-y-0"}>
                            <div className={"flex flex-col"}>
                                <label className={formik.touched.lastName && formik.errors.lastName ? "text-red-600" : ""}>
                                    {
                                        formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : "Nom"
                                    }
                                </label>
                                <Input type={"text"}
                                       size={"large"}
                                       name={"lastName"}
                                       value={formik.values.lastName}
                                       onChange={formik.handleChange}
                                       prefix={<User/>}
                                       className={""}
                                />
                            </div>

                            <div className={"flex flex-col"}>
                                <label className={formik.touched.firstName && formik.errors.firstName ? "text-red-600" : ""}>
                                    {
                                        formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : "Prénom"
                                    }
                                </label>
                                <Input type={"text"}
                                       size={"large"}
                                       name={"firstName"}
                                       value={formik.values.firstName}
                                       onChange={formik.handleChange}
                                       prefix={<User/>}
                                       className={""}
                                />
                            </div>
                        </div>


                        {/*email phone*/}
                        <div className={"flex flex-col space-y-3 md:flex-row md:space-x-3  md:space-y-0"}>
                            <div className={"flex flex-col"}>
                                <label className={formik.touched.email && formik.errors.email ? "text-red-600" : ""}>
                                    {
                                        formik.touched.email && formik.errors.email ? formik.errors.email : "Email"
                                    }
                                </label>
                                <Input type={"email"}
                                       size={"large"}
                                       name={"email"}
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       prefix={<LucideMail/>}
                                       className={""}
                                />
                            </div>

                            <div className={"flex flex-col"}>
                                <label className={formik.touched.phone && formik.errors.phone ? "text-red-600" : ""}>
                                    {
                                        formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de Téléphone"
                                    }
                                </label>
                                <Input type={"tel"}
                                       size={"large"}
                                       name={"phone"}
                                       pattern="\d{8}"
                                       minLength={8}
                                       maxLength={8}
                                       title="Veuillez entrer 8 chiffres."
                                       required
                                       value={formik.values.phone}
                                       onChange={formik.handleChange}
                                       prefix={<Phone/>}
                                       className={""}
                                />
                            </div>
                        </div>

                        {/*addres*/}
                        <div className={"flex flex-col"}>
                            <label className={formik.touched.address && formik.errors.address ? "text-red-600" : ""}>
                                {
                                    formik.touched.address && formik.errors.address ? formik.errors.address : "Addresse"
                                }
                            </label>
                            <Input type={"text"}
                                   size={"large"}
                                   placeholder={"ex: ville, quatier"}
                                   name={"address"}
                                   value={formik.values.address}
                                   onChange={formik.handleChange}
                                   prefix={<Map/>}
                                   className={""}
                            />
                        </div>

                        {/*passwords*/}
                        <div className={"flex flex-col space-y-3 md:flex-row md:space-x-3  md:space-y-0"}>
                            <div className={"flex flex-col"}>
                                <label
                                    className={formik.touched.passwords && formik.errors.passwords ? "text-red-600" : ""}>
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
                                       minLength={8}
                                       pattern="(?=.*[a-zA-Z])(?=.*\d).{8,}"
                                       required
                                       title="Le mot de passe doit contenir au moins une lettre et un chiffre."
                                />
                            </div>

                            <div className={"flex flex-col"}>
                                <label
                                    className={formik.touched.passwords2 && formik.errors.passwords2 ? "text-red-600" : ""}>
                                    {
                                        formik.touched.passwords2 && formik.errors.passwords2 ? formik.errors.passwords2 : "Confirmer le mot de passe"
                                    }
                                </label>
                                <Input.Password type={"password"}
                                       name={"passwords2"}
                                       size={"large"}
                                       value={formik.values.passwords2}
                                       onChange={formik.handleChange}
                                       iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                       prefix={<Lock/>}
                                       className={""}
                                />
                            </div>
                        </div>


                        {/*check bos*/}
                        <Radio.Group onChange={onChange} name={"role"} id={"role"} value={value}
                                     className={"flex flex-col space-y-3 md:flex-row md:space-x-3  md:space-y-0"}>
                            <Radio value={"provider"} className={"dark:text-white"}>Je suis prestateur</Radio>
                            <Radio value={"customer"} className={"dark:text-white"}>je suis à la recherche d'un
                                prestateur</Radio>
                        </Radio.Group>

                        <Button
                            htmlType={"submit"}
                            loading={isLoading}
                            className={"bg-secondaryColor w-auto"}>
                            S'enrégistrer
                        </Button>


                        <h1 className={"text-center"}>Vous avez déjà un compte? <Link href={"/login"}
                                                                                      className={"text-blue-600"}>Connectez-vous!</Link>
                        </h1>


                    </form>
                </div>
            </section>
        </div>
    );
}
export default Registre;