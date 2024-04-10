"use client"
import Image from "next/image";
import {Button, Input} from "antd";
import {CalendarRange, Clock, Lock, LucideMail, Map, MapPin, Phone, User} from "lucide-react";
import Link from "next/link";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {LoginModel} from "@/models/LoginModel";
import {Api} from "@/app/api/Api";
import type {RadioChangeEvent} from 'antd';
import {Radio} from 'antd';
import {UserModel} from "@/models/UserModel";
import {useRouter} from "next/navigation";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useToast} from "@/components/ui/use-toast";
import {Skeleton} from "@/components/ui/skeleton";
import RattingModal from "@/app/(customer)/componnents/RattingModal";
import {HistoryInterface} from "@/models/ServiseProviderInterface";

const Profil = () => {
    const [value, setValue] = useState("customer");
    const [errorMsg, setErrorMsg] = useState("");
    const route = useRouter();
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const [user, setUser] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [initialValues, setInitialValue] = useState<any>();
    const [isLoadingApp, setIsLoadingApp] = useState(false)
    const [appointHistory, setAppointHistory] = useState<HistoryInterface[]>([])

    const { toast } = useToast();
    useEffect(() => {
        setIsLoadingApp(true)
        setIsLoading(true)
        const fetchUser = async () => {
            try {
                const userData = await Api.read(`/api/user/${uid}`);
                setUser(userData);
                // Pass the initial values once user data is available
                const initialVals = {
                    lastName: userData?.lastName || '',
                    firstName: userData?.firstName || '',
                    email: userData?.email || '',
                    phone: userData?.phone || '',
                    address: userData?.address || '',
                };
                formik.setValues(initialVals);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false)
            }
        };

        Api.create(`/api/appointment/findByCustomerId/${uid}`, {status: "termine"}).then((values: any[]) => {
            const newValues: HistoryInterface[] = [];
            values.forEach((ele) => {
                newValues.push({
                    id: ele.id,
                    address: ele.address,
                    date: ele.appointmentDate,
                    hours: ele.appointmentHours,
                    providerName: ele.provider.user.firstName,
                    serviceName: ele.provider.service.serviceName,
                    serviceImage: ele.provider.service.imageUrl[0]
                })
            })
            setAppointHistory(newValues)
        }).finally(() =>{

            setIsLoadingApp(false)
        })
        fetchUser();
        setIsLoading(false)

    }, []);


    const formik = useFormik({

        initialValues: {
            lastName: "",
            firstName: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            lastName: Yup.string().required("votre nom est obligatoire"),
            firstName: Yup.string().required("votre prénom est obligatoire"),
            email: Yup.string().required("votre email est obligatoire").email("enter un email valide"),

            phone: Yup.number().integer("enter un numéro valide").required("votre numéro est obligatoire"),
            address: Yup.string().required("votre addresse est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            const userModel = new UserModel(String(values.lastName), String(values.firstName), String(values.email), String(user?.passwords), value, Number(values.phone), String(values.address), "image", true, true);
           const resp = await Api.update(`/api/user/${uid}`, userModel);
           if(resp) {
               toast({
                   title: "Votre Profil a été mise a jours"
               })
               route.refresh()
           }
           else {
               toast({
                   title: "Une erreur est surmenue lors de la mise a jours",
                   variant: "destructive"
               });
               setIsLoading(false)
           }
            setIsLoading(false)
        }
    })
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        <main className={"flex flex-col space-y-5 md:p-20 p-3 "}>
            <h1 className={"text-[35px] font-bold"}>Profile</h1>

            <section className={"flex  "}>

                {/*form*/}
                <div className={"md:w-[500px] flex flex-col space-y-5 "}>
                    <h1 className={"text-center text-red-600 text-[20px]"}>
                        {
                            errorMsg!="" && errorMsg
                        }
                    </h1>
                    <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5 w-full"}>

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
                                       placeholder={user?.lastName}
                                       defaultValue={user?.lastName}
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
                                       defaultValue={user?.firstName}
                                       placeholder={user?.firstName}
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
                                       defaultValue={user?.email}
                                       placeholder={user?.email}
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
                                       defaultValue={user?.phone}
                                       placeholder={String(user?.phone)}
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
                                   //placeholder={"ex: ville, quatier"}
                                   name={"address"}
                                   //defaultValue={user?.address}
                                   placeholder={user?.address}
                                   value={formik.values.address}
                                   onChange={formik.handleChange}
                                   prefix={<Map/>}
                                   className={""}
                            />
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
                    </form>
                </div>
            </section>

            {/*historique*/}
            <section className={"my-[30px]"}>
                <h1 className={"text-2xl font-bold"}>Historique des services terminés</h1>
                <div className={"  w-full grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    {
                        isLoadingApp ?
                            [1, 2, 3, 4].map((items) => {
                                return <div key={items}>
                                    <Skeleton className={"w-full h-[200px]"}/>
                                </div>
                            })
                            : appointHistory.length == 0 ?
                                <div className={"w-auto flex flex-col space-y-5 self-center "}>
                                    <Image src={"/illustration/Empty-pana.svg"} alt={""}
                                           priority={true}
                                           quality={100}
                                           width={400}
                                           height={400}
                                           className={"bg-center self-center object-cover bg-cover"}
                                    />
                                    <h1 className={"text-center text-[40px] text-red-600"}>Vide!!</h1>
                                </div>
                                :
                                appointHistory.map((items, index) => {
                                    return <div key={index}
                                                className={"flex space-x-3 w-full p-3 h-[200px] rounded-md  border-2 border-gray-200"}>


                                        {/*image*/}
                                        <Image src={items.serviceImage}
                                               alt={""}
                                               width={150}
                                               priority={true}
                                               quality={100}
                                               height={180}
                                               className={"object-cover bg-center bg-cover rounded-md h-wull"}
                                        />

                                        <div className={"flex flex-col space-y-2"}>
                                            <h1 className={"font-bold text-xl"}>{items.serviceName}</h1>
                                            <div className={"flex space-x-2"}>
                                                <User className={"text-purple-600 "}/>
                                                <h1 className={"text-purple-600 font-bold "}> {items.providerName}</h1>
                                            </div>

                                            <div className={"flex space-x-2"}>
                                                <MapPin className={"text-purple-600 "}/>
                                                <h1 className={"text-gray-600 "}> {items.address}</h1>
                                            </div>

                                            <div className={"flex space-x-2"}>
                                                <CalendarRange className={"text-purple-600 "}/>
                                                <h1 className={"text-gray-600 "}>Date: <span
                                                    className={"font-bold text-black dark:text-white"}>{items.date}</span>
                                                </h1>
                                            </div>

                                            <div className={"flex space-x-2"}>
                                                <Clock className={"text-purple-600 "}/>
                                                <h1 className={"text-gray-600 "}> heure: <span
                                                    className={"font-bold text-black dark:text-white"}>{items.hours}</span>
                                                </h1>
                                            </div>


                                        </div>
                                    </div>
                                })
                    }
                </div>

            </section>
        </main>
    );
}
export default Profil;