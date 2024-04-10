"use client"
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Clock, HandCoins, Mails, Map, MapPin, Phone, Upload, User} from "lucide-react";
import {Book} from "@/components/Book";
import {useEffect, useState} from "react";
import {ServiseProviderInterface} from "@/models/ServiseProviderInterface";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";

export default function ServiceDetail({params}: {params: {id: string}}) {
    const [services, setServices] = useState<ServiseProviderInterface[]>([])
    const [isLoadingserv, setIsLoadingserv] = useState(false);
    const [isLoadingserv2, setIsLoadingserv2] = useState(false);
    const [provider, setProvider] = useState<ServiseProviderInterface>()


    useEffect(() => {
        setIsLoadingserv(true)
        setIsLoadingserv2(true)
        Api.read(`/api/provider/${params.id}`).then((element: any) => {

            setProvider({
                address: element.user.address,
                availability: element.availability,
                categoryName: element.service.category.categoryName,
                description: element.service.description,
                email: element.user.email,
                estimatedDuration: element.estimatedDuration,
                firstName: element.user.firstName,
                id: element.id,
                imageUrlService: element.service.imageUrl,
                imageUrlUser: element.user.imageUrl,
                lastName: element.user.lastName,
                phone: element.user.phone,
                serviceName: element.service.serviceName,
                tarif: element.tarif,
            });

        }).finally(() =>{
            setIsLoadingserv(false)
        });

        Api.read("/api/provider").then((values: any[]) => {
            const newdata: ServiseProviderInterface[] =[];
            values.forEach((element) => {
                newdata.push({
                    address: element.user.address,
                    availability: element.availability,
                    categoryName: element.service.category.categoryName,
                    description: element.service.description,
                    email: element.user.email,
                    estimatedDuration: element.estimatedDuration,
                    firstName: element.user.firstName,
                    id: element.id,
                    imageUrlService: element.service.imageUrl,
                    imageUrlUser: element.user.imageUrl,
                    lastName: element.user.lastName,
                    phone: element.user.phone,
                    serviceName: element.service.serviceName,
                    tarif: element.tarif,
                })
            })
            setServices(newdata);

        }).finally(() =>{
            setIsLoadingserv2(false)
        });


    }, []);


    return(
        <main className={"md:my-10 flex flex-col space-y-10 my-5 md:px-10 px-3"}>
            <section className={"flex flex-col space-y-5 md:flex-row md:items-center md:justify-between md:content-between"}>
                <div className={"flex items-center space-x-3"}>
                    {
                        isLoadingserv
                        ?
                            <Skeleton className={"rounded-full h-[150px] w-[150px] "}/>
                            : <Image
                                src={provider?.imageUrlUser != undefined && String(provider?.imageUrlUser) !="" ? String(provider.imageUrlUser): "/illustration/3d-business-joyful-man-with-phone-waving-his-hand.png"}
                                alt={""}
                                width={150}
                                height={200}
                                className={"rounded-full h-[150px] object-cover"}
                            />
                    }


                    {
                        isLoadingserv ?
                            <div className={"flex flex-col space-y-3"}>
                                <Skeleton className={"w-[150px] h-[20px]"} />
                                <Skeleton className={"w-[150px] h-[20px]"} />
                                <Skeleton className={"w-[150px] h-[20px]"} />
                                <Skeleton className={"w-[150px] h-[20px]"} />
                                <Skeleton className={"w-[150px] h-[20px]"} />
                            </div>
                            :
                            <div className={"flex flex-col space-y-3"}>
                                <Badge variant="secondary"
                                       className={"bg-cyan-200 text-blue-600  w-[100px] text-center h-[30px] "}>{provider?.categoryName}</Badge>

                                <h1 className={"text-[30px] font-bold"}>{provider?.serviceName}</h1>

                                <div className={"flex space-x-3"}>
                                    <MapPin className={"text-gray-600 dark:text-white"}/>
                                    <h1 className={"text-gray-600 dark:text-white"}>{provider?.address}</h1>
                                </div>

                                <div className={"flex space-x-3"}>
                                    <Phone className={"text-gray-600 dark:text-white"}/>
                                    <h1 className={"text-gray-600 dark:text-white"}>{provider?.phone}</h1>
                                </div>

                                <div className={"flex space-x-3"}>
                                    <Mails className={"text-gray-600 dark:text-white"}/>
                                    <h1 className={"text-gray-600 dark:text-white"}>{provider?.email}</h1>
                                </div>
                            </div>
                    }

                </div>

                {
                    isLoadingserv ?
                        <div className={"flex flex-col md:items-end space-y-3"}>
                            <Skeleton className={"w-[150px] h-[20px]"} />
                            <Skeleton className={"w-[150px] h-[20px]"} />
                            <Skeleton className={"w-[150px] h-[20px]"} />
                            <Skeleton className={"w-[150px] h-[20px]"} />
                            <Skeleton className={"w-[150px] h-[20px]"} />
                        </div>
                        :
                        <div className={"flex flex-col md:items-end space-y-3"}>

                            <div className={"flex space-x-3"}>
                                <User className={"text-gray-600 dark:text-white "}/>
                                <h1 className={"text-[23px] text-blue-600"}>{provider?.firstName} {provider?.lastName}</h1>
                            </div>

                            <div className={"flex space-x-3"}>
                                <HandCoins className={"text-gray-600 dark:text-white "}/>
                                <h1 className={"text-[23px] text-gray-600 dark:text-white"}>{provider?.tarif} CFA</h1>
                            </div>

                            <div className={"flex space-x-3"}>
                                <Clock className={"text-gray-600 dark:text-white "}/>
                                <h1 className={"text-[23px] text-gray-600 dark:text-white"}>{provider?.availability}</h1>
                            </div>

                            <Book providerId={String(provider?.id)} amount={Number(provider?.tarif)}/>

                        </div>
                }

            </section>

            <section
                className={"flex flex-col space-y-5 md:flex-row md:space-x-10 md:justify-between md:content-between"}>
                <div className={"flex w-full md:w-full flex-col space-y-5"}>
                    <h1 className={"text-[25px] font-bold mt-5"}>Description</h1>

                    {
                        isLoadingserv ? <Skeleton className={"w-full md:w-[600px] h-[300px]"}/> :
                            <h1>
                                {provider?.description}
                            </h1>
                    }


                    <h1 className={"text-[25px] font-bold mt-5"}>Galegie</h1>
                    <div className={"grid grid-cols-2 md:grid-cols-3 gap-2"}>
                        {
                            isLoadingserv
                                ?
                                [1, 4, 4, 5, 4].map((items, index) => {
                                    return(
                                        <div key={index}>
                                            <Skeleton className={"rounded-xl h-[100px] w-[180px]"}/>
                                        </div>
                                    )
                                })
                                :
                            provider?.imageUrlService.map((items, index) => {
                                return (
                                    <div key={index}>
                                        <Image
                                            src={String(items)}
                                            alt={""}
                                            width={220}
                                            height={100}
                                            className={" rounded-xl h-[100px] bg-center bg-cover object-cover "}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={"flex w-full mt-5 flex-col space-y-5"}>
                <h1 className={"text-[25px] font-bold"}>Services similaires</h1>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-3.5"}>
                        {
                            isLoadingserv2?
                                [1,2,3,4,5,6,7].map((items, index) => {
                                    return <div key={index}>
                                        <Skeleton className={"w-[220px] h-[120px] rounded-xl"}/>
                                    </div>
                                })
                                :
                            services.map((items, index) => {
                                if (index <=6) {
                                    return(
                                        <Link href={`/service_detail/${items.id}`}
                                              className={"flex space-x-2 rounded-md p-3 border-2 border-gray-200"}
                                              key={index}>
                                            <Image
                                                src={items.imageUrlService[0]}
                                                alt={""}
                                                width={100}
                                                height={120}
                                                className={" rounded-xl h-[120px] bg-center bg-cover object-cover "}
                                            />
                                            <div className={"flex flex-col space-y-1"}>
                                                <h1 className={"text-[20px] font-bold"}>{items.serviceName}</h1>
                                                <h1 className={"text-[20px] text-blue-600"}>{items.firstName}</h1>
                                                <h1 className={"text-[20px] text-gray-600"}>{items.address}</h1>
                                            </div>
                                        </Link>
                                    )
                                }

                            })
                        }
                    </div>

                </div>
            </section>
        </main>
    );
}