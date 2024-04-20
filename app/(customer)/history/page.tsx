"use client"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {User, MapPin, Clock, CalendarRange} from "lucide-react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect, useState} from "react";
import {HistoryInterface} from "@/models/ServiseProviderInterface";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import RattingModal from "@/app/(customer)/componnents/RattingModal";
import {useRouter} from "next/navigation";
export default function History() {
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const [status, setStatus] = useState('planifier')
    const [appointHistory, setAppointHistory] = useState<HistoryInterface[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        setIsLoading(true)
        Api.create(`/api/appointment/findByCustomerId/${uid}`, {status: status}).then((values: any[]) => {
            const newValues: HistoryInterface[] = [];
            values.forEach((ele) => {
                newValues.push({
                    id: ele.id,
                    address: ele.address,
                    date: ele.appointmentDate,
                    hours: ele.appointmentHours,
                    providerName: ele.provider.user.firstName,
                    serviceName: ele.provider.service.serviceName,
                    serviceImage: ele.provider.service.imageUrl[0]
                })
            })
            setAppointHistory(newValues)
        }).finally(() =>{
            setIsLoading(false)
        })
    }, []);
    return(
      <main className={"flex flex-col space-y-2 my-5 mx-3 md:mx-[10%]  md:my-20"}>
          <h1 className={"font-bold text-[30px]"}>Mes services</h1>
          <div className={"bg-gray-200 h-[40px] w-full p-1  flex space-x-5 rounded-sm"}>
              <Button size={"sm"}
                      type={"button"}
                      onClick={() =>{
                          setStatus("planifier");
                          router.refresh();
                      }}
                      className={status=="planifier"? "bg-secondaryColor text-white font-bold": "bg-white text-black font-bold"}>
                  Services Passés
              </Button>

              <Button size={"sm"}
                      type={"button"}
                      onClick={() =>{
                          setStatus("termine");
                          router.refresh();
                      }}
                      className={status=="termine"? "bg-secondaryColor text-white font-bold": "bg-white text-black font-bold"}>
                  Services Terminés
              </Button>
          </div>

          <div className={"w-full grid grid-cols-1 md:grid-cols-2 gap-4"}>
              {
                  isLoading?
                      [1,2,3,4].map((items) =>{
                          return <div key={items}>
                              <Skeleton className={"w-full h-[200px]"} />
                          </div>
                      })
                      : appointHistory.length ==0 ?
                          <div className={"w-auto flex flex-col space-y-5 self-center "}>
                              <Image src={"/illustration/Empty-pana.svg"} alt={""}
                                     priority={true}
                                     quality={100}
                                     width={400}
                                     height={400}
                                     className={"bg-center self-center object-cover bg-cover"}
                              />
                              <h1 className={"text-center text-[40px] text-red-600"}>Vide!!</h1>
                          </div>
                      :
                  appointHistory.map((items, index) => {
                      return <div key={index} className={"flex space-x-3 w-full p-3 h-[200px] rounded-md  border-2 border-gray-200"}>


                          {/*image*/}
                          <Image src={items.serviceImage}
                                 alt={""}
                                 width={150}
                                 priority={true}
                                 quality={100}
                                 height={180}
                                 className={"object-cover bg-center bg-cover rounded-md h-wull"}
                          />

                          <div className={"flex flex-col space-y-2"}>
                              <h1 className={"font-bold text-[15px] md:text-xl"}>{items.serviceName}</h1>
                              <div className={"flex space-x-2"}>
                                  <User className={"text-purple-600 "}/>
                                  <h1 className={"text-purple-600 font-bold "}> {items.providerName}</h1>
                                  <div className={status != "termine" ? "hidden": ""}>
                                      <RattingModal appId={Number(items.id)} userId={Number(uid)}/>
                                  </div>
                              </div>

                              <div className={"flex space-x-2"}>
                                  <MapPin className={"text-purple-600 "}/>
                                  <h1 className={"text-gray-600 "}> {items.address}</h1>
                              </div>

                              <div className={"flex space-x-2"}>
                                  <CalendarRange className={"text-purple-600 "}/>
                                  <h1 className={"text-gray-600 "}>Date: <span className={"font-bold text-black text-[13px] dark:text-white"}>{items.date}</span></h1>
                              </div>

                              <div className={"flex space-x-2"}>
                                  <Clock className={"text-purple-600 "}/>
                                  <h1 className={"text-gray-600 "}> heure: <span className={"font-bold text-black dark:text-white"}>{items.hours}</span></h1>
                              </div>


                          </div>
                      </div>
                  })
              }
          </div>
      </main>
    );
}