import Header from "@/app/(provider)/components/Header";
import ProviderSidbar from "@/app/(provider)/components/ProviderSidbar";


export default function ProviderLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className={"flex  "}>
            <ProviderSidbar/>

            <div className={"w-full md:mr-5 "}>
                <Header/>

                <div className={"md:bg-pink-50  mb-10  p-5 rounded-xl"}>
                    {children}
                </div>
            </div>


        </main>
    );
}