import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {AppointmentModel} from "@/models/AppointmentModel";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const appointmentModel: AppointmentModel = await req.json();
        const appointmentValidate = Dto.appointmentDto().validate(appointmentModel);

        const appoint = await prismadb.appointment.update({
            where: {id: id },
            data: appointmentValidate.value
        });
        return NextResponse.json({
            appointment: appoint,
            ok: true,
        });
    }catch (error) {
        console.error("[APPINTMENT_PUT]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const appointement = await prismadb.appointement.delete({
            where: { id: id }
        });

        return NextResponse.json({
            appointment: appointement,
            ok: true,
        });
    } catch (error) {
        console.error('[DELET_CATEGORY]', error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const appointement = await prismadb.appointement.findUnique({
            where: { id }
        });

        return NextResponse.json(appointement);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}