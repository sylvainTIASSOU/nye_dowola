import {CategoryModel} from "@/models/CategoryModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    try {
        const category: CategoryModel = await req.json();
        const categoryValidate = Dto.categoryDto().validate(category);
        const cat = await prismadb.category.create({data: categoryValidate.value});
        return NextResponse.json({
            category: cat,
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
        const category = await prismadb.category.findMany();
        return NextResponse.json(category);
    } catch (error) {
        console.error('[GET_CATEGORY]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}