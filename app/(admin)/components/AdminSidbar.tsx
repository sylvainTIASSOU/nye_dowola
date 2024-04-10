"use client"


import SidbarContent from "@/app/(admin)/components/SidbarContent";

const AdminSidbar = () => {
    return(
        <div className={"fixed md:flex hidden left-0 top-0 w-[250px] shadow-md dark:bg-black  dark:shadow-amber-50  items-center pt-20"}>

               <SidbarContent />


        </div>
    )
}

export default AdminSidbar;