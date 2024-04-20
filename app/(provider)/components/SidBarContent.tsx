"use client"

import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

import {GoBellFill} from "react-icons/go";
import {FaCalendarAlt, FaHistory} from "react-icons/fa";
import {RiDashboardFill} from "react-icons/ri";
import {IoSettings} from "react-icons/io5";
import {usePathname} from "next/navigation";
import { FaComments } from "react-icons/fa6";


const items = [
    {
        icon: <RiDashboardFill className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Dashboard",
        link: "/provider"
    },
    {
        icon: <FaHistory className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Historique",
        link: "/provider/history"
    },

    {
        icon: <FaCalendarAlt className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Reservation",
        link: "/provider/reservations"
    },
    {
        icon: <FaComments className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Commentaires",
        link: "/provider/comments"
    },

    {
        icon: <IoSettings className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Parametre",
        link: "/provider/settings"
    },
]
const SidBarContent = () => {
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const active = useSelector((state: RootState) => state.activationReducer.value.isActive)
    const pathName = usePathname();
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        Api.read(`/api/user/${uid}`).then((values: any) => {
            setIsActive(values.isActive as boolean);
        })
    }, []);
    return(
        <div className={"flex flex-col space-y-5 px-3"}>
            <Image src={"/icons/logo1.svg"}
                   alt={"login image"}
                   priority={true}
                   width={150}
                   height={150}
                   className={"bg-cover bg-center bg-content "}
            />
            {
                active && <Link href={"/provider/activation"} className={"flex items-center space-x-1 text-red-600 font-medium mb-3 "}>
                    <ShieldCheck/>
                    <h1>Activer votre compte</h1>
                </Link>
            }

            {
                items.map((item, index) =>{
                    return <Link key={index} href={item.link} className={pathName==item.link? "bg-teal-200 text-orange-500 p-1 rounded-md flex items-center space-x-1  font-bold mb-3 ": "hover:bg-teal-200 hover:p-1 hover:text-orange-500 hover:rounded-md hover:font-bold flex items-center space-x-1 text-slate-500 font-medium mb-3 "} >
                        {item.icon}
                        <h1> {item.label} </h1>
                    </Link>
                })
            }


        </div>
    )
}
export default SidBarContent;