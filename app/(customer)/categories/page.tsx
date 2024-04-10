"use client"

import {Input} from "antd";
import {Search} from "lucide-react";
import CardCategory from "@/components/CardCategory";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";

export default function Categories() {
    const [isLoadingCat, setIsLoadingCat] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CategoryModel[]>([]);
    const [actif, setActif] = useState(false);

    useEffect(() => {
        setIsLoadingCat(true)
        Api.read("/api/category").then((values) => {
            setCategories(values);
        }).finally(() =>{
            setIsLoadingCat(false)
        })
    }, []);

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

    return(
        <div className={"flex flex-col space-y-20 items-center justify-center mt-5 mx-3 md:mx-20  md:mt-20"}>
            {/*search inpput*/}
            <section className={"w-auto mx-3 mt-14"}>
                <div className={"flex space-x-3 w-full"}>
                    <Input type={"text"}
                           size={"small"}
                           onChange={handleChange}
                           placeholder={"Rechercher"}
                           className={"bg-transparent rounded-[25px] md:w-[350px] w-[300px] h-[40px]  border border-primaryColor"}
                    />

                    <div className={"rounded-full flex items-center justify-center h-[40px] w-[40px] bg-blue-300"}>
                        <Search  className={"h-5 w-5 text-secondaryColor"}/>
                    </div>
                </div>
            </section>

            {/*categories*/}
            <CardCategory cat={query==""? categories: results}
                          loading={isLoadingCat}/>
        </div>
    );
}