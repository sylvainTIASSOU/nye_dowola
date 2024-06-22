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



const { Search } = Input;

const Categories = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CategoryModel[]>([]);
    const [actif, setActif] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState<CategoryModel[]>([])


    useEffect(() => {
        Api.read('/api/category').then((values: any[]) => {
            setCategories(values);
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
            const filteredResults = categories.filter(item =>
                item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };

    const tableConstruction  = (data: CategoryModel[]) => {
        

        return data.map((arts) => (
            <TableRow key={arts.id}>
                <TableCell>
                    <Image src={arts.imageUrl}
                           alt={"image"}
                           width={50}
                           height={50}
                           className={"bg-center bg-cover bg-content"}
                    />
                </TableCell>
                <TableCell>{arts.categoryName}</TableCell>

                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemo childrens={
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            router.push(`/admin/edit_category/${arts.id}`);
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
                                                Api.delete(`/api/category/${arts.id}`)
                                                setCategories(categories.filter((item) => item.id !== arts.id))
                                                
                                                
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
                   <h1 className={"md:text-[40px] text-2xl font-bold"}> Categories ({categories.length})</h1>
                   <h1 className={"md:text-[18px] text-md font-light"}>Gestion des categories</h1>
               </div>

               <Button className={"flex space-x-2"}
                       size={"sm"}
                       variant={"default"}
                       onClick={() => {
                           router.push("/admin/add_category");
                       }}

               >
                   <Plus/>
                   <h1>Ajouter une Catégorie</h1>
               </Button>
           </section>

            <Separator className={"mt-5 w-full "} />

            <div className={"w-auto self-center"}>
                <Search size={"large"} className={"md:w-[500px]"} placeholder="Rechercher une catégorie" onChange={handleChange} onSearch={onSearch} enterButton />
            </div>


            {/*table*/}
            <Table>
                <TableCaption>Liste des catégories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead className="w-[100px]">Nom</TableHead>

                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/*table body*/}
                <TableBody>
                    {
                        query == '' ? tableConstruction(categories) : tableConstruction(results)
                    }
                </TableBody>
            </Table>

        </div>
    )
}
export  default Categories;