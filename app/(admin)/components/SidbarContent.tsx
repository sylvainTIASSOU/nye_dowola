"use client"

import Image from "next/image";
import Link from "next/link";
import {LayoutGrid, ServerCog} from "lucide-react";
import {useEffect, useState} from "react";

export default function SidbarContent() {
    const [currentRoute, setCurrentRoute] = useState("");

    useEffect(() => {
        setCurrentRoute(window.location.pathname)
    }, []);

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

            <div className={"w-auto mt-10 flex flex-col space-y-3 items-start "}>
                <Link href={"/admin/categories"}
                      className={currentRoute == "/admin/categories" ? "text-primaryColor font-bold flex space-x-3" : "text-[18px] flex space-x-3 font-light hover:font-bold hover:text-secondaryColor "}
                >
                    <LayoutGrid/>
                    <h1> Catégories</h1>
                </Link>

                <Link href={"/admin/services"}
                      className={currentRoute == "/admin/services" ? "text-primaryColor font-bold flex space-x-3" : "text-[18px] flex space-x-3 font-light hover:font-bold hover:text-secondaryColor "}
                >
                    <ServerCog/>
                    <h1> Services</h1>
                </Link>
            </div>
        </div>
    )
}

