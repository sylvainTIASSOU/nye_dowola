import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";


export async function POST(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const status = await req.json();
        const appoint = await prismadb.appointment.findMany({
            where: {
                userId: id,
                appointmentStatus: status.status
            },
            include: {
                provider:{
                    include:{
                        service: true,
                        user: true,
                    }
                }
            }
        });
        return NextResponse.json(appoint);
    }catch (error) {
        console.error("[CATEGORY_PUT]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}