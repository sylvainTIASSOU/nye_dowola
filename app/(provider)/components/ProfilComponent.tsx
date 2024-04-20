'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {LogOut, User, History} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {logOut} from "@/redux/features/auth-slice";


const ProfilComponent = () => {
    const route = useRouter()
    const dispatch = useDispatch();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    className={"w-[35px] h-[35px] rounded-full flex items-center justify-center  border border-[5px] border-purple-500"}>
                    <User/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>

                <DropdownMenuSeparator/>


                <DropdownMenuItem>
                <Button type={"button"}
                            size={"sm"}
                            variant={"outline"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                route.push('/provider/profil')
                            }}
                    >
                        <User/>
                        <h1>Profile</h1>
                    </Button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Button type={"button"}
                            size={"sm"}
                            variant={"destructive"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                dispatch(logOut());
                                route.push("/");
                            }}
                    >
                        <LogOut/>
                        <h1>Se Deconnecter</h1>
                    </Button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    );
}
export default ProfilComponent;