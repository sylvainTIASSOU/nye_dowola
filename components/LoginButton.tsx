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


const LoginButton = () => {
    const route = useRouter()
    const dispatch = useDispatch();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={"h-[35px] w-[35px] flex items-center rounded-full  border-secondaryColor border-[4px]"}>
                    <Image src={"/illustration/3d-business-joyful-man-with-phone-waving-his-hand.png"}
                           alt={"profil"}
                           priority={true}
                           width={40}
                           height={40}
                           className={"bg-cover bg-center bg-content"}

                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>

                <DropdownMenuSeparator />


                    <DropdownMenuItem>
                        <Button type={"button"}
                                size={"sm"}
                                variant={"outline"}
                                className={"w-full flex space-x-3 "}
                                onClick={() => {
                                    route.push('/profil')
                                }}
                        >
                            <User/>
                           <h1>Profile</h1>
                        </Button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Button type={"button"}
                            size={"sm"}
                            variant={"outline"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                route.push('/history')
                            }}
                    >
                        <History/>
                       <h1>Historique</h1>
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
export default LoginButton;