"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/app/api/Api";
import Image from "next/image";

// Fonction pour rediriger l'utilisateur connecté
const redirectToSpecificPage = () => {
    const router = useRouter();
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)


    useEffect(() => {
        // Vérifiez si l'utilisateur est connecté (vous devez implémenter cette vérification vous-même)
        const userIsLoggedIn = true; // Mettez votre logique de vérification ici

        // Si l'utilisateur est connecté, redirigez-le vers la page spécifique
        if (isAuth) {
            Api.read(`/api/user/${uid}`).then((values) => {
                if(values.role == "customer") {
                    router.replace('/home');
                }
                else if(values.role == "provider") {
                    router.replace('/provider');
                }
                else {
                    router.replace('/admin');
                }
            })
            // // Remplacez '/page-specifique' par l'URL de votre page spécifique
        }
        else {
            router.replace('/home');
        }
    }, []); // Utilisez une dépendance vide pour exécuter l'effet une seule fois au montage

    // Ce composant ne rend rien, car il gère uniquement la redirection
    return <div className={"flex h-screen items-center justify-center"}>

        <Image src={"/icons/logo.gif"} alt={""}
               width={500}
               height={500}
               priority={true}
               quality={100}
               className={"object-cover bg-center"}/>
    </div>;
};

export default redirectToSpecificPage;
