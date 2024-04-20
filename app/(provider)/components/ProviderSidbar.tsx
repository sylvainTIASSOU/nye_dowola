"use client"

import { FaUserGear } from "react-icons/fa6";
import SidBarContent from "./SidBarContent";

const ProviderSidbar = () => {
    return(
        <div className={"hidden md:flex pt-10 w-[250px] h-screen  flex-col space-y-10 items-center  "}>
        <SidBarContent/>
        </div>
    )
}
export default ProviderSidbar;