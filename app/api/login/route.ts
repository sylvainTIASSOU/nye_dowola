import {UserModel} from "@/models/UserModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import { LoginModel } from "@/models/LoginModel";

export async function POST(req: Request) {
    try {
        const loginModel: LoginModel = await req.json();
        const dataValidate = Dto.loginDto().validate(loginModel);

        // Recherche de l'utilisateur dans la base de données en fonction du numéro de téléphone
        const phone = dataValidate.value.phone;

        const user: UserModel[] = await prismadb.user.findMany({
            where:
                { phone: phone }
        });
        // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe
        // Vérification de l'existence de l'utilisateur
        if (user.length === 0) {
            return new NextResponse(JSON.stringify({msg:'l utilisateur n existe pass' , ok: false}), {status: 500});
        }

        const users: UserModel = user[0];

        // Vérification de la correspondance du mot de passe
        const isPasswordValid = await bcrypt.compare(dataValidate.value.passwords, users.passwords);
        if (!isPasswordValid) {
            return new NextResponse(JSON.stringify({msg:'mot de passe incorrecte', ok: false}), {status: 500});

        }
        return new NextResponse(JSON.stringify({
            id: users.id,
            role: users.role,
            ok: true,
        }), { status: 200 });
    }catch (error) {
        console.error('[user_login]', error);
        return new NextResponse(JSON.stringify({msg:'Internal error', ok: false}), {status: 500});
    }
}