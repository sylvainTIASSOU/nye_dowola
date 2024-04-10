import Navbar from "@/components/Navbar";
import FooterCustomer from "@/app/(customer)/componnents/FooterCustomer";

export default function CustomerLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className={""}>
            <Navbar/>
            {children}
            <FooterCustomer/>
        </main>
    );
}