import Header from "@/app/(provider)/components/Header";
import ProviderSidbar from "@/app/(provider)/components/ProviderSidbar";


export default function ProviderLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className={""}>
            <Header/>
            <ProviderSidbar/>
            <div className={"flex h-screen justify-center items-center"}>
                {children}
            </div>

        </main>
    );
}