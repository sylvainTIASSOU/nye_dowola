"use client"

import Image from "next/image";
interface CardInterf {
    title: string;
    value: string;
    image: string;
}
const CardDashboard = ({
                           title,
                           value,
                           image,
                       }: CardInterf) => {
    return (
        <div
            className={"flex items-center justify-center space-x-5 h-[100px]  rounded-md border-[2px] border-cyan-600 w-full md:w-[250px] bg-white"}>
            <Image src={image} alt={""} width={70} height={70}/>
            <div className={"flex flex-col space-y-2"}>
                <h1 className={"font-bold text-[20px] text-gray-400"}>{title}</h1>
                <h1 className={"font-bold text-[20px] text-gray-400"}>{value}</h1>
            </div>
        </div>
    );
}
export default CardDashboard;