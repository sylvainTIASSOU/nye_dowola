"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {CategoryModel} from "@/models/CategoryModel";
import {Skeleton} from "@/components/ui/skeleton";

interface CatInterf {
    cat: CategoryModel[],
    loading: boolean,
}
const CardCategory = ({cat,
                          loading}: CatInterf) => {
    const route = useRouter();

    return (
        <section className={"mt-10  items-center grid grid-cols-2 gap-4  md:grid-cols-6"}>
            {
                loading ?
                    [1, 1, 5, 2, 2].map((items, index) => {
                        return(
                            <div key={index}>
                                <Skeleton className={"h-[150px] w-[150px] rounded-[15px]"} />
                            </div>
                        )
                    })
                    :
                    cat.length == 0 ?
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
                cat.map((items, index) => {
                    return (
                        <div
                            onClick={() => {
                                route.push(`/services/${items.id}`)
                            }}
                            key={index}
                            className={" catHover h-[150px] w-[150px] rounded-[15px] bg-purple-100 flex flex-col items-center justify-center space-y-3 "}>
                            <Image src={items.imageUrl}
                                   alt={"cat"}
                                   priority={true}
                                   width={60}
                                   height={60}
                                   className={"bg-cover "}/>

                            <h1 className={"font-bold text-[20px] text-center text-black"}>
                                {items.categoryName}
                            </h1>
                        </div>
                    )
                })
            }

        </section>

    )
}
export default CardCategory;