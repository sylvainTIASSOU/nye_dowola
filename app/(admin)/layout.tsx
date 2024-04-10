import AdminNavbar from "@/app/(admin)/components/AdminNavbar";
import AdminSidbar from "@/app/(admin)/components/AdminSidbar";


export default function AdminLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className={""}>

            <AdminNavbar/>
            <div className={"md:ml-[20%] px-2  mt-[5%]"}>
                {children}
            </div>

            <AdminSidbar/>
        </main>
    );
}