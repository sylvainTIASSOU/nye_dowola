"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {CalendarPlus} from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {Input} from "antd";
import {useEffect, useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {AppointmentModel} from "@/models/AppointmentModel";
import { Api } from "@/app/api/Api";
import {useToast} from "@/components/ui/use-toast";
import {useKKiaPay} from "kkiapay-react";
import {PaymentModel} from "@/models/PaymentModel";
import { Button } from "./ui/button";
import {useRouter} from "next/navigation";


export function Book({providerId, amount}: {providerId: string, amount: number}) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const { toast } = useToast();
    const [appId, setAppId] = useState(0);
    const [user, setUser] = useState<any>()
    const [address, setAddress] = useState("");
    const [hours, setHours] = useState("");
    const router = useRouter();
    const {
        openKkiapayWidget,
        addKkiapayListener,
        removeKkiapayListener
    } = useKKiaPay();


    function open() {
        openKkiapayWidget({
            fullname: `${user.lastName} ${user.firstName}`,
            amount: amount,
            api_key: "3cb8ff60f18711eeae665f935f4f8891",
            sandbox: true,
            email: `${user.email}`,
            phone: "97000000",
        });
    }
    // ..... others components options
    async function successHandler(response: any) {
       const appointmentDate = `${date?.getDate()} / ${Number(date?.getMonth())+1} / ${date?.getFullYear()} `
        if(hours != "" && address != "") {
            const appointmentModel = new AppointmentModel(appointmentDate, hours, address, "planifier", +providerId, +uid)
            const resp = await Api.create("/api/appointment", appointmentModel);
            if(resp.ok) {
                const paymentModel = new PaymentModel(Number(amount), appointmentDate,"payer", Number(uid), Number(resp.appointment.id));
                const resp2 = await Api.create("/api/paiement", paymentModel);
                if(resp2.ok) {
                    toast({
                        title: "Votre rendez-vous a été planifier avec succès"
                    });
                    router.push('/congratulation');
                }
                else {
                    toast({
                        title: "Une erreur est survénue lors de la planificatiion de votre rendez-vous",
                        variant: "destructive"
                    });
                }

            } else {
                toast({
                    title: "Une erreur est survénue lors de la planificatiion de votre rendez-vous",
                    variant: "destructive"
                });
            }
        }else {
            toast({
                title: "l'addresse et l'heure du rendez-vous sont requisent.",
                variant: "destructive"
            });
        }

    }

    function failureHandler(error: any) {
        console.log(error);
        toast({
            title: "Une erreur est survénue lors du paiement",
            variant: "destructive"
        });
    }

    useEffect(() => {

        Api.read(`/api/user/${uid}`).then((value) => {
            setUser(value)
        })

        addKkiapayListener('success',successHandler)
        addKkiapayListener('failed', failureHandler)

        return () => {
            removeKkiapayListener('success')
            removeKkiapayListener('failed')
        };
    }, [addKkiapayListener,removeKkiapayListener, address, hours]);





    const formik = useFormik({
        initialValues: {
            address: "",
            appointmentHours: "",
        },
        validationSchema: Yup.object({
            address: Yup.string().required("L'addresse est requise"),
            appointmentHours: Yup.string().required("L'heure est requise")
        }),
        onSubmit:  (values) => {
            setHours(values.appointmentHours);
            setAddress(values.address)
            open();
        }
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button  className={"flex space-x-3 p-2 bg-secondaryColor"}>
                    <CalendarPlus className={"text-white"}/>
                    <h1 className={"text-white"}>Prendre Rendez-Vous</h1>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Programmer votre rendez-vous</SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
                    {/*calendar*/}
                    <div>
                        <label htmlFor="name" className="text-right">
                            Selectionner la date du rendez-vous
                        </label>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div>

                    {/*hours selet*/}
                    <div className="">
                        <label htmlFor="name" className={formik.touched.appointmentHours && formik.errors.appointmentHours ? "text-red-600 text-right" : "text-right"}>
                            {
                                formik.touched.appointmentHours && formik.errors.appointmentHours ? formik.errors.appointmentHours :" Selectionner la date du rendez-vous"
                            }

                        </label>
                        <Input type={"time"}
                               name={"appointmentHours"}
                               value={formik.values.appointmentHours}
                               onChange={formik.handleChange}
                               className="col-span-3" />
                    </div>

                    {/*address*/}
                    <div className="">
                        <label htmlFor="addresse" className={formik.touched.address && formik.errors.address ? "text-right text-red-600": "text-right"}>
                            {
                                formik.touched.address && formik.errors.address ? formik.errors.address: "Saisiser l'addresse du lieu"
                            }

                        </label>
                        <Input type={"text"}
                               name={"address"}
                               value={formik.values.address}
                               onChange={formik.handleChange}
                               className="col-span-3" />
                    </div>

                    <Button type="submit" variant={"default"} className={""}>Enrégistrer</Button>
                </form>
                <SheetFooter>
                    <SheetClose asChild>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
