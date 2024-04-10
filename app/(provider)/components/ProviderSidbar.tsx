"use client"

import { FaUserGear } from "react-icons/fa6";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {GoBellFill} from "react-icons/go";
import {FaCalendarAlt} from "react-icons/fa";
import Link from "next/link";
import {RiDashboardFill} from "react-icons/ri";
import {IoSettings} from "react-icons/io5";

const items = [
    {
        icon: <RiDashboardFill className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Dashboard",
        link: "/provider"
    },
    {
        icon: <FaUserGear className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Profil",
        link: "/provider/profil"
    },

    {
        icon: <GoBellFill className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Notification",
        link: "/provider/notification"
    },
    {
        icon: <FaCalendarAlt className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Reservation",
        link: "/provider/reservation"
    },

    {
        icon: <IoSettings className={"w-[30px] h-[30px] text-secondaryColor"}/>,
        label: "Parametre",
        link: "/provider/settings"
    },
]
const ProviderSidbar = () => {
    return(
        <div className={"flex p-3 flex-col items-center justify-center space-y-3 bg-cyan-200 w-[80px] h-[350px] fixed right-[35px] top-[23%] rounded-[25px]"}>

            {
                items.map((item, index) =>{
                    return <Link key={index} href={item.link}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className={"hover:text-primaryColor"}>{item.icon}</TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                })
            }

        </div>
    )
}
export default ProviderSidbar;