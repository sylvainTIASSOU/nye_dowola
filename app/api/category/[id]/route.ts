
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {RattingModel} from "@/models/RattingModel";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const ratting: RattingModel = await req.json();
        const rattingValidate = Dto.categoryDto().validate(ratting);
        const rat = await prismadb.ratting.update({
            where: {id: id },
            data: rattingValidate.value
        });
        return NextResponse.json({
            ratting: rat,
            ok: true,
        });
    }catch (error) {
        console.error("[CATEGORY_PUT]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const rat = await prismadb.ratting.delete({
            where: { id: id }
        });

        return NextResponse.json({
            ratting: rat,
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
        const rat = await prismadb.ratting.findUnique({
            where: { id }
        });

        return NextResponse.json(rat);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}