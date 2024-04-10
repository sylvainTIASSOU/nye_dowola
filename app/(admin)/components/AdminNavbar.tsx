"use client"

import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import {Button} from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Menu} from "lucide-react";
import SidbarContent from "@/app/(admin)/components/SidbarContent";

const AdminNavbar = () => {
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const route = useRouter();

    return(
        <div className={"relative top-0 flex w-auto md:ml-[17%] h-[50px] shadow-md dark:shadow-amber-50  justify-between content-between items-center"}>
            <div className={"ml-3 md:ml-0 flex space-x-5"}>
                <div className={"flex md:hidden"}>
                    <Popover>
                        <PopoverTrigger><Menu/></PopoverTrigger>
                        <PopoverContent className={"w-[250px] shadow-md dark:bg-black  dark:shadow-amber-50  border-none"}>
                            <SidbarContent/>
                        </PopoverContent>
                    </Popover>

                </div>
                <Link href={"/"} className={"text-blue-600"}>ACCEUIL</Link>
            </div>

            <div className={"md:pr-5 pr-3 flex space-x-3 md:space-x-5"}>
                {
                    !isAuth ?
                        <Button type={"button"}
                                size={"sm"}
                                onClick={() => {
                                    route.push('/login')
                                }}
                                className={"bg-primaryColor"}
                        >
                            Login
                        </Button>
                        :
                        <LoginButton/>
                }


                <ModeToggle/>
            </div>
        </div>
    )
}

export default AdminNavbar;