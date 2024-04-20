"use client"

import {Button, Input} from "antd";
import Image from "next/image";
import CardService from "@/components/CardService";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import {ServiseProviderInterface} from "@/models/ServiseProviderInterface";
import {useRouter} from "next/navigation";
import {Search} from "lucide-react";

export default function Services({params}: {params: {id: string}}) {
    const [services, setServices] = useState<ServiseProviderInterface[]>([])
    const [isLoadingserv, setIsLoadingserv] = useState(false);

    const [isLoadingCat, setIsLoadingCat] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CategoryModel[]>([]);
    const [actif, setActif] = useState(false);
    const [catName, setCatName] = useState('');
    const route = useRouter();
    useEffect(() => {
        setIsLoadingCat(true)
        setIsLoadingserv(true)

        Api.read("/api/category").then((values: CategoryModel[]) => {
            setCategories(values);
            values.forEach((el) =>{
                if(el.id == Number(params.id)) {
                    setCatName(el.categoryName);
                }
            })

        }).finally(() =>{
            setIsLoadingCat(false)
        });

        Api.read(`/api/provider/findByCatId/${params.id}`).then((values: any[]) => {
            const newdata: ServiseProviderInterface[] =[];
            values.forEach((element) => {
                newdata.push({
                    address: element.user.address,
                    availability: element.availability,
                    categoryName: element.service.category.categoryName,
                    description: element.service.category.description,
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
            setIsLoadingserv(false)
        })


    }, []);



    return (
        <main className={"flex flex-col space-y-5 md:flex-row md:space-x-10 md:px-14 px-5 md:my-10 my-5"}>
            <div className={""}>
                <h1 className={"text-[30px] font-bold text-secondaryColor"}>categories</h1>
                {/*categories */}
                <div className={"flex flex-col space-y-3"}>
                    {
                        isLoadingCat ?
                            [1,2,3,4,5,6].map((items) => {
                                return(
                                    <div key={items}>
                                        <Skeleton className={"w-[320px] px-3 h-[55px] "}/>
                                    </div>
                                )
                            })
                            :
                        categories.map((items, index) => {

                            return(
                                <button key={index} className={ Number(items.id)== Number(params.id) ?
                                    "w-[320px] px-3 h-[55px] flex space-x-5 shadow-md dark:shadow-white " +
                                    " items-center bg-fuchsia-200  text-blue-600 border rounded-md border-blue-600 "

                                    : "w-[320px] px-3 h-[55px] flex space-x-5 shadow-md dark:shadow-white " +
                                    " items-center hover:bg-purple-100  hover:text-blue-600 border rounded-md hover:border-blue-600 "}
                                        type={"button"}
                                        onClick={() => {
                                            route.push(`/services/${items.id}`)
                                        }}

                                >
                                    <Image src={items.imageUrl}
                                           alt={"cat"}
                                           priority={true}
                                           width={40}
                                           height={40}
                                           className={"bg-cover "}/>

                                    <h1 className={"font-bold text-[18px] "}>
                                        {items.categoryName}
                                    </h1>

                                </button>
                            )
                        })
                    }
                </div>

            </div>

            <div>
                {/**/}
                <section className={""}>
                    <h1 className={"text-[30px] font-bold "}>
                        {catName.toUpperCase()}
                    </h1>


                    {/*search bar div*/}

                    <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-5"}>
                        {
                            isLoadingserv ?
                                [1, 2, 1, 3, 4, 5, 6].map((items, index) => {
                                    return (
                                        <div key={index}>
                                            <Skeleton className={"rounded-[15px] w-full md:w-[200px] h-[250px]"}/>
                                        </div>
                                    );
                                })
                                :
                                services.length == 0 ?
                                    <div className={"md:w-[600px] w-full ml-10 flex flex-col space-y-5 self-center "}>
                                        <Image src={"/illustration/Empty-pana.svg"} alt={""}
                                               priority={true}
                                               quality={100}
                                               width={200}
                                               height={200}
                                               className={"md:hidden w-full flex bg-center self-center object-cover bg-cover"}
                                        />

                                        <Image src={"/illustration/Empty-pana.svg"} alt={""}
                                               priority={true}
                                               quality={100}
                                               width={500}
                                               height={500}
                                               className={"hidden w-[500px] h-[500px] md:flex bg-center self-center object-cover bg-cover"}
                                        />
                                        <h1 className={"text-center text-[40px] text-red-600"}>Vide!!</h1>
                                    </div>
                                    :
                                services.map((items, index) => {
                                    return (
                                        <div key={index}>
                                            <CardService  serviceName={items.serviceName}
                                                          categoryName={items.categoryName}
                                                          providerName={items.firstName}
                                                          image={items.imageUrlService[0]}
                                                          address={items.address}
                                                          id={Number(items.id)}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </section>
            </div>
        </main>
    );
}