import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {RattingModel} from "@/models/RattingModel";


export async function POST(req: Request) {
    try {
        const ratting: RattingModel = await req.json();
        const rattingValidate = Dto.rattingDto().validate(ratting);
        const rat = await prismadb.ratting.create({data: rattingValidate.value});
        return NextResponse.json({
            ratting: rat,
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
        const ratting = await prismadb.ratting.findMany({
            include: {
                user: true
            }
        });
        return NextResponse.json(ratting);
    } catch (error) {
        console.error('[GET_CATEGORY]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}