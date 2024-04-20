"use client"

import Image from "next/image";
import Link from "next/link";
import {Gauge, LayoutDashboard, LayoutGrid, MessageCircleHeart, ServerCog, User, UserCog, Settings} from "lucide-react";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const Links = [
    {
        link: "/admin",
        icon: <LayoutDashboard/>,
        label: "Dashboard",
    },
    {
        link: "/admin/resevations",
        icon: <Gauge/>,
        label: "Reservations",
    },
    {
        link: "/admin/customer",
        icon: <User/>,
        label: "Clients",
    },
    {
        link: "/admin/prestataire",
        icon: <UserCog/>,
        label: "Prestataires",
    },
    {
        link: "/admin/categories",
        icon: <LayoutGrid/>,
        label: "Catégories",
    },
    {
        link: "/admin/services",
        icon: <ServerCog/>,
        label: "Services",
    },
    {
        link: "/admin/commentes",
        icon: <MessageCircleHeart/>,
        label: "Commentaires",
    },
    {
        link: "/admin/settings",
        icon: <Settings/>,
        label: "Parametre",
    },
]
export default function SidbarContent() {
    const currentRoute = usePathname();


    return(
        <div className={"flex flex-col h-screen space-y-5 items-center w-full"}>
            {/*image*/}

            <Image src={"/icons/logo1.svg"}
                   alt={"logo"}
                   priority={true}
                   width={180}
                   height={180}
                   className={" flex bg-cover bg-center bg-content"}
            />

            <div className={"w-auto mt-10 flex flex-col space-y-5 items-start "}>
                {
                    Links.map((items, index) => {
                        return(
                            <Link key={index} href={items.link}
                                  className={currentRoute == items.link ? "text-primaryColor font-bold flex space-x-3" : "text-[18px] flex space-x-3 font-light hover:font-bold hover:text-secondaryColor "}
                            >
                                {items.icon}
                                <h1> {items.label}</h1>
                            </Link>
                        )
                    })
                }



            </div>
        </div>
    )
}

