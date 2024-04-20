"use client"

import Image from "next/image";
import Link from "next/link";
import {Bell, Menu, User} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import SidBarContent from "@/app/(provider)/components/SidBarContent";
import ProfilComponent from "@/app/(provider)/components/ProfilComponent";

const Header = () => {
    return(
        <div className={" w-full h-[50px] relative top-0 flex items-center justify-between content-between md:justify-end md:content-end px-5"}>
            <div className={"flex md:hidden"}>
                <Popover>
                    <PopoverTrigger><Menu/></PopoverTrigger>
                    <PopoverContent className={"w-[250px] shadow-md dark:bg-black flex items-center  dark:shadow-amber-50  border-none"}>
                        <SidBarContent/>
                    </PopoverContent>
                </Popover>

            </div>

            <div className={"flex space-x-5 items-center"}>
                <Bell/>

               <ProfilComponent/>
            </div>

        </div>
    )
}
export default Header;