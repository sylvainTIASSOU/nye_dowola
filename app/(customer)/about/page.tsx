"use client"
import Image from "next/image"
import {FaFacebook, FaLinkedin, FaSquareInstagram, FaXTwitter} from "react-icons/fa6";
import {IoLogoWhatsapp, IoMailSharp} from "react-icons/io5";
import Link from "next/link";
import CommentCarousel from "@/app/(customer)/componnents/CommentCarousel";

const reseau = [
    {
        icon: <FaSquareInstagram />,
        link: "https://www.instagram.com/sylvtias?igsh=NGtjMWtlMnV5dW5o"
    },
    {
        icon: <FaFacebook />,
        link: "https://www.facebook.com/sylvain.tiassou.1"
    },
    {
        icon: <FaXTwitter />,
        link: "https://x.com/STiassou?t=1HMFMzSxdtbgW9QG3aA_ww&s=08"
    },
    {
        icon: <FaLinkedin />,
        link: "https://www.linkedin.com/in/sylvain-tiassou-444b9b26a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },


]
export default function About() {
    return(
        <main className={"flex flex-col space-y-5 md:px-14 px-3 md:my-10 my-5"}>
            <section>

                <div className={"flex items-center space-y-5 flex-col md:flex-row md:space-x-5"}>

                    <div>
                        <h1 className={"text-[30px] font-bold "}>Présentation de l'entreprise</h1>
                        <div className={"md:w-[800px]"}>
                            <span className={"font-bold text-secondaryColor"}> Nyé DoWoLa</span> est une entreprise
                            spécialisée
                            dans la prestation de services à domicile,
                            offrant une gamme complète de solutions pour répondre
                            aux besoins quotidiens de nos clients. Depuis notre création
                            cette année, nous nous sommes engagés à fournir
                            des services de haute qualité, personnalisés et fiables à nos clients,
                            en mettant l'accent sur la satisfaction et le bien-être de nos clients.
                        </div>
                    </div>

                    <div className={"w-full"}>
                        <Image src={"/illustration/3d-casual-life-young-man-with-floor-cleaning.png"}
                               alt={""}
                               width={400}
                               height={400}
                               className={"bg-cover bg-center"}/>
                    </div>
                </div>
            </section>

            <section>

                <div className={"flex items-center space-y-5 flex-col-reverse md:flex-row md:space-x-5"}>

                    <div className={"w-full"}>
                        <Image src={"/illustration/3d-casual-life-young-householder-putting-on-gloves.png"}
                               alt={""}
                               width={400}
                               height={400}
                               className={"bg-cover bg-center"}/>
                    </div>

                    <div>
                        <h1 className={"text-[30px] font-bold "}>Services proposés</h1>
                        <div className={"md:w-[800px]"}>
                            Chez <span className={"font-bold text-secondaryColor"}> Nyé DoWoLa</span> , nous offrons une
                            gamme complète de services à domicile pour répondre
                            à tous vos besoins. Notre équipe de professionnels
                            qualifiés et expérimentés est là pour vous aider à
                            maintenir votre maison ou votre entreprise en parfait
                            état, vous offrant confort, tranquillité d'esprit et
                            satisfaction totale.

                            <div className={"hidden"}>
                                Voici un aperçu des services que nous proposons:
                                1. Plomberie
                                Réparation de fuites d'eau
                                Installation de robinets
                                Débouchage des canalisations
                                Installation de chauffe-eau
                                Réparation de chasse d'eau
                                2. Électricité
                                Installation de prises électriques
                                Réparation de pannes électriques
                                Installation de luminaires
                                Vérification de la sécurité électrique
                                Installation de système de climatisation
                                3. Jardinage
                                Tonte de pelouse
                                Taille des arbres et des arbustes
                                Entretien des parterres de fleurs
                                Désherbage
                                Installation d'irrigation
                                4. Nettoyage
                                Nettoyage des vitres
                                Nettoyage de moquette/tapis
                                Nettoyage des sols
                                Nettoyage des façades
                                Nettoyage de fin de chantier
                                5. Entretien et Réparations Générales
                                Réparation de meubles
                                Peinture intérieure/extérieure
                                Installation de serrures
                                Réparation de petits appareils électroménagers
                                Réparation de murs et plafonds
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className={"bg-blue-500 p-5"}>

                <div className={"flex flex-col space-y-3 md:flex-row md:space-x-3 items-center justify-center"}>
                    <div className={"flex flex-col space-y-3 md:flex-row md:space-x-3 "}>
                        <div className={"flex flex-col space-y-10 "}>
                            <div
                                className={"bg-white flex flex-col space-y-3 items-center rounded-md h-[300px] w-[230px]"}>
                                <Image src={"/images/prof2.png"}
                                       alt={"prof"}
                                       width={130}
                                       height={150}
                                       className={"h-[150px] rounded-full bg-center bg-cover"}
                                />

                                <h1 className={"text-center font-bold text-xl"}>sylvain <br/> TIASSOU </h1>
                                <h1 className={"text-center text-secondaryColor"}>Analyste Programmeur</h1>

                                {/*reseau*/}
                                <div className={"flex space-x-5"}>
                                    {
                                        reseau.map((items, index) => {
                                            return <Link href={items.link} key={index} className={"text-black"}>
                                                {items.icon}
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>
                            <div
                                className={"bg-white  hidden md:flex flex-col space-y-3 items-center rounded-md h-[300px] md:w-[230px]"}>

                            </div>

                        </div>
                        <div className={"hidden md:flex flex-col space-y-10 mt-10 "}>
                            <div
                                className={"bg-white flex flex-col space-y-3 items-center rounded-md h-[300px] md:w-[230px]"}>

                            </div>
                            <div
                                className={"bg-white flex flex-col space-y-3 items-center rounded-md h-[300px] md:w-[230px]"}>

                            </div>

                        </div>
                    </div>
                    <div>
                        <h1 className={"text-[30px] text-white font-bold "}>Notre Équipe </h1>

                        <h1 className={"text-white md:w-[500px]"}>
                            Chez <span className={"font-bold text-secondaryColor"}> Nyé DoWoLa</span>, nous sommes fiers
                            de notre équipe de professionnels
                            hautement qualifiés et dévoués, qui partagent tous une passion commune pour offrir des
                            services exceptionnels à nos clients. Voici quelques membres clés de notre équipe


                        </h1>
                    </div>
                </div>
            </section>

            <section>

                <div className={"flex items-center space-y-5 flex-col md:flex-row md:space-x-5"}>

                    <div>
                        <h1 className={"text-[30px] font-bold "}>Engagement envers la qualité </h1>

                        <div className={"md:w-[800px]"}>
                            Chez <span className={"font-bold text-secondaryColor"}> Nyé DoWoLa</span> , notre engagement
                            envers la qualité est au cœur de tout ce que
                            nous faisons. Nous croyons fermement que nos clients méritent les meilleurs services
                            possibles,
                            et nous nous efforçons constamment d'atteindre et de dépasser leurs attentes.

                            <div className={"hidden"}>
                                Voici les
                                principes qui guident notre approche de la qualité :
                                1. Excellence du Service
                                Nous nous engageons à fournir des services de la plus haute qualité à nos clients, en
                                utilisant les meilleures pratiques de l'industrie et en veillant à ce que chaque
                                intervention soit réalisée avec professionnalisme et souci du détail.

                                2. Satisfaction du Client
                                La satisfaction de nos clients est notre priorité absolue. Nous travaillons en étroite
                                collaboration avec nos clients pour comprendre leurs besoins uniques et leur offrir des
                                solutions personnalisées qui répondent à leurs attentes et dépassent leurs exigences.

                                3. Fiabilité et Ponctualité
                                Nous comprenons l'importance de la fiabilité et de la ponctualité dans le domaine des
                                services à domicile. Nous nous engageons à respecter les délais convenus et à être là
                                quand
                                nos clients ont besoin de nous, garantissant ainsi une expérience sans stress et sans
                                tracas.

                                4. Utilisation de Produits de Qualité
                                Nous utilisons uniquement des produits et des matériaux de la plus haute qualité dans
                                toutes
                                nos interventions, garantissant ainsi des résultats durables et une satisfaction à long
                                terme pour nos clients.

                                5. Formation et Développement Continus
                                Nous investissons dans la formation et le développement de notre personnel pour garantir
                                qu'ils disposent des compétences et des connaissances nécessaires pour offrir des
                                services
                                de la plus haute qualité à nos clients.
                            </div>
                        </div>
                    </div>


                    <div className={"w-full"}>
                        <Image src={"/illustration/lifestyle-two-men-shaking-hands-making-business-deal-1.png"}
                               alt={""}
                               width={400}
                               height={400}
                               className={"bg-cover bg-center"}/>
                    </div>
                </div>
            </section>

            <section>
                <h1 className={"text-[30px] font-bold "}>Témoignages de clients </h1>

                <div className={"mt-5 self-center"}>
                    <CommentCarousel/>
                </div>
            </section>
        </main>
    );
}