import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {AppointmentModel} from "@/models/AppointmentModel";


export async function POST(req: Request) {
    try {
        const appointmentModel: AppointmentModel = await req.json();
        const appointmentValidate = Dto.appointmentDto().validate(appointmentModel);
        const appoint = await prismadb.appointment.create({data: appointmentValidate.value});
        return NextResponse.json({
            appointment: appoint,
            ok: true,
        });
    }catch (error) {
        console.error("[CATEGORY_POST]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}


export async function GET(req: Request) {
    try {
        const appoint = await prismadb.appointment.findMany();
        return NextResponse.json(appoint);
    } catch (error) {
        console.error('[GET_CATEGORY]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}