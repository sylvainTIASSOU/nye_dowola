"use client";
import Image from "next/image";
import {ModeToggle} from "@/components/ModeToggle";
import {Button} from "@/components/ui/button";
import {useRouter, usePathname} from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import {Bell} from "lucide-react";
import { Badge } from 'antd';
import {useEffect, useState} from "react";
import NotificationsCustomer from "@/app/(customer)/componnents/NotificationsCustomer";

const Navbar = () => {
    const currentRoute = usePathname();
    const route = useRouter();
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);


    return(
        <div className={"w-full h-[70px] dark:shadow-white shadow-md flex items-center justify-between content-between px-2 md:px-10"}>
            <div className={"flex space-x-3 md:space-x-5 items-center"}>
                {/*image*/}

                <Image src={"/icons/logo1.svg"}
                       alt={"logo"}
                       priority={true}
                       width={180}
                       height={180}
                       className={" hidden md:flex bg-cover bg-center bg-content"}
                />
                <Link className={currentRoute == "/home" ? "text-primaryColor font-bold" : ""} href={"/home"}>Acceuil</Link>
                <Link className={currentRoute == "/categories" ? "text-primaryColor font-bold" : ""} href={"/categories"}>Services</Link>
                <Link className={currentRoute == "/about" ? "text-primaryColor font-bold" : ""} href={"/about"}>A Propos</Link>
            </div>

            <div className={"flex space-x-3 md:space-x-5"}>
                {
                    !isAuth ?
                        <Button type={"button"}
                                size={"sm"}
                                onClick={() => {route.push('/login')}}
                                className={"bg-primaryColor"}
                        >
                            Login
                        </Button>
                        :
                        <LoginButton/>
                }

                <NotificationsCustomer/>


                <ModeToggle/>
            </div>
        </div>
    );
}
export default Navbar;