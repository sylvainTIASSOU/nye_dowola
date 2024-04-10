
import {CategoryModel} from "@/models/CategoryModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const category: CategoryModel = await req.json();
        const categoryValidate = Dto.categoryDto().validate(category);
        const cat = await prismadb.category.update({
            where: {id: id },
            data: categoryValidate.value
        });
        return NextResponse.json({
            category: cat,
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
        const cat = await prismadb.category.delete({
            where: { id: id }
        });

        return NextResponse.json({
            category: cat,
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
        const cat = await prismadb.category.findUnique({
            where: { id }
        });

        return NextResponse.json(cat);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}