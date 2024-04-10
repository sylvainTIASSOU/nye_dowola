"use client"
import Image from "next/image";
import {Input} from "antd";
import {Search} from "lucide-react";
import { Badge } from "@/components/ui/badge"
import {Button} from "@/components/ui/button";
import {TextGenerateEffect} from "@/components/TextGenerateEffect";
import { motion } from "framer-motion";
import {ImagesSlider} from "@/components/ImagesSlider";
import CardService from "@/components/CardService";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";
import CardCategory from "@/components/CardCategory";
import {ServiseProviderInterface} from "@/models/ServiseProviderInterface";
import {Skeleton} from "@/components/ui/skeleton";
import CommentCarousel from "@/app/(customer)/componnents/CommentCarousel";


export default function Home() {
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);

    const route = useRouter();
    const [isLoadingserv, setIsLoadingserv] = useState(false);

    const [isLoadingCat, setIsLoadingCat] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CategoryModel[]>([]);
    const [actif, setActif] = useState(false);
    const [services, setServices] = useState<ServiseProviderInterface[]>([])
    useEffect(() => {
        setIsLoadingCat(true)
        setIsLoadingserv(true)
        Api.read("/api/category").then((values) => {
            setCategories(values);
        }).finally(() =>{
            setIsLoadingCat(false)
        })

        Api.read("/api/provider").then((values: any[]) => {
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

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = categories.filter(item =>
                item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };
  const images = [
      "https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=1024x1024&w=is&k=20&c=LkKMuHe7Uj0PjkyC0bn7HEQmQ8Iidl8B8_rqFiPSS2A=",
      "https://media.istockphoto.com/id/1457385092/photo/an-asian-young-technician-service-man-wearing-blue-uniform-checking-cleaning-air-conditioner.jpg?s=1024x1024&w=is&k=20&c=Puii5WGNbAoetrdWRWpkQjgdmJpABjJbNHpDx8lUykI=",
      "https://media.istockphoto.com/id/1464505039/photo/customer-welcoming-repairman.jpg?s=1024x1024&w=is&k=20&c=m00rXeoDk2ruiuerH8DW6WIK6Mo8EeAvt8bto2dgQLo=",
      "https://media.istockphoto.com/id/1169172660/photo/pipefitter-plumber.jpg?s=1024x1024&w=is&k=20&c=kGi4ly9ju1wHfBmRA4_mmPE39uX_nvivWmb3RTjsVFg=",
      "https://media.istockphoto.com/id/1345670559/photo/electrician-fixing-an-electrical-outlet-and-measuring-the-voltage.jpg?s=1024x1024&w=is&k=20&c=dz5_lyjLKfnn4s7FRJjG_-Ca6xze9kVdIWwHDXkj58E=",
      "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <main >
      <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Bienvenue sur Nye Dowola  Votre<br /> Solution Tout-en-Un pour <br/>  les Services à Domicile.
          </motion.p>
            {
                isAuth ?
                    <button onClick={() => {
                        route.push('/categories');
                    }}
                            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                        <span>Prendre une rendez-vous Maintenant →</span>
                        <div
                            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent"/>
                    </button>
                    :
                    <button onClick={() => {
                        route.push('/registre');
                    }}
                            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                        <span>S'inscrire Maintenant →</span>
                        <div
                            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent"/>
                    </button>
            }

        </motion.div>
      </ImagesSlider>

        <div className={"flex flex-col  items-center justify-center md:px-20 px-5 md:mt-10 mt-5"}>


            {/*search inpput*/}
            <section className={"w-auto mt-14 mx-3"}>
                <div className={"flex space-x-3 w-full"}>
                    <Input type={"text"}
                           size={"small"}
                           onChange={handleChange}
                           placeholder={"Rechercher une categorie"}
                           className={"bg-transparent rounded-[25px] md:w-[350px] w-[300px] h-[40px]  border border-primaryColor"}
                    />

                    <div className={"rounded-full flex items-center justify-center h-[40px] w-[40px] bg-blue-300"}>
                        <Search className={"h-5 w-5 text-secondaryColor"}/>
                    </div>
                </div>
            </section>

            {/*categories*/}
            <CardCategory cat={query == "" ? categories : results}
                          loading={isLoadingCat}/>


            {/**/}
            <section className={"mt-20"}>
                <h1 className={"text-[30px] font-bold text-underline"}>
                    Les services populaires.
                </h1>

                <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-10"}>
                    {
                        isLoadingserv ?
                            [1, 2, 1, 3, 4, 5, 6].map((items, index) => {
                                return (
                                    <div key={index}>
                                        <Skeleton className={"rounded-[15px] w-full mx-2 md:w-[200px] h-[250px]"}/>
                                    </div>
                                );
                            })
                            :
                            services.length == 0 ?
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
                            services.map((items, index) => {
                                if (index <= 4) {
                                    return (
                                        <div key={index}>
                                            <CardService serviceName={items.serviceName}
                                                         categoryName={items.categoryName}
                                                         providerName={items.firstName}
                                                         image={items.imageUrlService[0]}
                                                         address={items.address}
                                                         id={Number(items.id)}
                                            />
                                        </div>
                                    )
                                }

                            })
                    }
                </div>


            </section>

            <section className={"mt-10 mb-10 w-full relative  bg-no-repeat  object-cover bg-cover bg-center py-10 px-3"}>
                <h1 className={"text-[30px] font-bold"}>
                    Ce que les Clients disent
                </h1>
                <div className={"mt-5 self-center"}>
                    <CommentCarousel/>
                </div>
            </section>

        </div>

    </main>
  );
}
