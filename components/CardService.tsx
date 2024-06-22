"user client"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface CardInterface {
    categoryName: string;
    image: string;
    serviceName: string;
    providerName: string;
    address: string;
    id: number;
}
const CardService = ({
    categoryName,
    image,
    serviceName,
    providerName,
    address,
    id,
}: CardInterface) => {
    const router = useRouter()
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);

    return (
        <div className={" catHover rounded-[15px] shadow-md dark:shadow-white flex flex-col pb-2   md:h-auto"}>
            <div className={"  md:w-auto w-full rounded-[15px]"}>
                <Image
                    src={image}
                    alt={"services"}
                    priority={true}
                    width={300}
                    height={200}
                    className={"bg-cover bg-center bg-content w-full rounded-[15px]"} />
            </div>

            <div className={"px-2 mt-[5%] md:mt-2 flax flex-col space-y-3 md:space-y-0"}>
                <Badge variant="secondary" className={"bg-cyan-200 text-blue-600 w-auto h-[30px] "}>{categoryName}</Badge>
                <h1>
                     <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><h1 className={"md:text-[18px] text-[15px] font-bold"}>{serviceName.slice(0, 19)}...</h1></TooltipTrigger>
                        <TooltipContent>
                            <p>{serviceName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </h1>
               
                

                <h1 className={"font-bold text-[18px] text-blue-800"}>{providerName}</h1>

                <h1>{address}</h1>

                <Button type={"button"}
                    size={"sm"}
                    className={"bg-primaryColor"}
                    onClick={() => {
                        isAuth ?
                            router.push(`/service_detail/${id}`)
                            :
                            router.push('/login')
                    }}
                >
                    Reserver maintenant
                </Button>
            </div>
        </div>

    );
}

export default CardService;