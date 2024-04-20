"use client"

import {Button} from "@/components/ui/button";
import {Plus, SeparatorHorizontal} from "lucide-react";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import {CategoryModel} from "@/models/CategoryModel";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DropdownMenuDemo} from "@/components/DropdownMenu";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {ServiceModel} from "@/models/ServiceModel";

const { Search } = Input;

const Services = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ServiceModel[]>([]);
    const [actif, setActif] = useState(false);
    const router = useRouter();
    const [services, setServices]  = useState<any[]>([])

    useEffect(() => {
        Api.read('/api/service').then((values: any[]) => {
            setServices(values);
        })
    }, []);
    const onSearch: SearchProps['onSearch'] = (value, _e, info) =>{
        console.log(info?.source, value);
    }
    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = services.filter(item =>
                item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };

    const tableConstruction  = (data: ServiceModel[]) => {
        return data.map((arts) => (
            <TableRow key={arts.id}>
                <TableCell>{arts.serviceName}</TableCell>
                <TableCell>{arts.categoryId}</TableCell>

                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemo childrens={
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            router.push(`/admin/edit_services/${arts.id}`);
                                        }}
                                        className={'self-center w-full'}
                                >
                                    Edite
                                </Button>
                            </DropdownMenuItem>

                            {/*delete Item*/}
                            <DropdownMenuItem>

                                <Button type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={() => {
                                            const confirmation: boolean = confirm("Voulez-vous suprimer cette article?")

                                            if(confirmation) {
                                                //remove(String(arts.id))
                                            }
                                        }}

                                >
                                    Suprimer
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    }/>
                </TableCell>
            </TableRow>
        ))
    }

    return(
        <div className={"mx-3 md:mx-10 flex flex-col space-y-10"}>
            <section className={"flex justify-between content-between items-center"}>
                <div className={"flex flex-col"}>
                    <h1 className={"md:text-[40px] text-2xl font-bold"}> Services ({services.length})</h1>
                    <h1 className={"md:text-[18px] text-md font-light"}>Gestion des Services</h1>
                </div>

                <Button className={"flex space-x-2"}
                        size={"sm"}
                        variant={"default"}
                        onClick={() => {
                            router.push("/admin/add_services");
                        }}

                >
                    <Plus/>
                    <h1>Ajouter une Service</h1>
                </Button>
            </section>

            <Separator className={"mt-5 w-full "} />

            <div className={"w-auto self-center"}>
                <Search size={"large"} className={"md:w-[500px]"} placeholder="Rechercher une service" onChange={handleChange} onSearch={onSearch} enterButton />
            </div>


            {/*table*/}
            <Table>
                <TableCaption>Liste des catégories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom du Service</TableHead>
                        <TableHead>Id du categorie</TableHead>

                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/*table body*/}
                <TableBody>
                    {
                        query == '' ? tableConstruction(services) : tableConstruction(results)
                    }
                </TableBody>
            </Table>
        </div>
    )
}
export  default Services;