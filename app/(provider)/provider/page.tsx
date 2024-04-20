"use client"
import Image from "next/image";
import CardDashboard from "@/app/(provider)/components/CardDashbord1";
import {LineChart1} from "@/app/(provider)/components/Chart";
import {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import {HistoryInterface} from "@/models/ServiseProviderInterface";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {CalendarRange, Clock, MapPin, User} from "lucide-react";
import RattingModal from "@/app/(customer)/componnents/RattingModal";

export default function Provider() {
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const [appointHistory, setAppointHistory] = useState<HistoryInterface[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true)
        Api.create(`/api/appointment/findByProviderId/${uid}`, {status: "termine"}).then((values: any[]) => {
            const newValues: HistoryInterface[] = [];
            values.forEach((ele: any) => {
                newValues.push({
                    id: ele.id,
                    address: ele.address,
                    date: ele.appointmentDate,
                    hours: ele.appointmentHours,
                    providerName: ele.user.firstName,
                    serviceName: ele.provider.service.serviceName,
                    serviceImage: ele.provider.service.imageUrl[0]
                })
            })
            setAppointHistory(newValues)
        }).finally(() =>{
            setIsLoading(false);
        })
    }, []);
    return(
        <div className={"w-full flex flex-col space-y-10"}>
            <h1 className={"text-[35px]"}>DASHBOARD</h1>

            <div
                className={" w-full items-center justify-center grid grid-cols-1 md:grid-cols-4 gap-4"}>
                <CardDashboard title={"prix total"} value={"80000 CFA"} image={"/images/argent.png"}/>
                <CardDashboard title={"services total"} value={"8"} image={"/images/options.png"}/>
                <CardDashboard title={"Ratting"} value={"8"} image={"/images/etoile.png"}/>
                <CardDashboard title={"Commentaires"} value={"8"} image={"/images/commentaire.png"}/>

            </div>

            {/*courbe et autre */}
            <div className={"w-full bg-white h-full my-10"}>
                <LineChart1/>
            </div>


            <h1 className={"text-[35px]"}>Liste des services effectués</h1>
            <div className={"w-full grid grid-cols-1 md:grid-cols-2 gap-4"}>
                {
                    isLoading ?
                        [1, 2, 3, 4].map((items) => {
                            return <div key={items}>
                                <Skeleton className={"w-full h-[200px]"}/>
                            </div>
                        })
                        : appointHistory.length == 0 ?
                            <div className={"w-full flex flex-col space-y-5 items-center justify-center "}>
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
                                        <h1 className={"font-bold text-[18px] md:text-xl"}>{items.serviceName}</h1>
                                        <div className={"flex space-x-2"}>
                                            <User className={"text-purple-600 "}/>
                                            <h1 className={"text-purple-600 font-bold "}> {items.providerName}</h1>
                                            <div className={status != "termine" ? "hidden" : ""}>
                                                <RattingModal appId={Number(items.id)} userId={Number(uid)}/>
                                            </div>
                                        </div>

                                        <div className={"flex space-x-2"}>
                                            <MapPin className={"text-purple-600 "}/>
                                            <h1 className={"text-gray-600 "}> {items.address}</h1>
                                        </div>

                                        <div className={"flex space-x-2"}>
                                            <CalendarRange className={"text-purple-600 "}/>
                                            <h1 className={"text-gray-600 "}>Date: <span
                                                className={"font-bold text-[15px] text-black dark:text-white"}>{items.date}</span></h1>
                                        </div>

                                        <div className={"flex space-x-2"}>
                                            <Clock className={"text-purple-600 "}/>
                                            <h1 className={"text-gray-600 "}> heure: <span
                                                className={"font-bold text-black dark:text-white"}>{items.hours}</span></h1>
                                        </div>


                                    </div>
                                </div>
                            })
                }
            </div>
        </div>
    );
}