import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const {userId} = auth()
        const body = await request.json()
        const {name, bannerId} = body

        if(!name) {
            return new NextResponse("Missing name", { status: 400 })
        }
        if(!bannerId) {
            return new NextResponse("Missing banner id", { status: 400 })
        }    
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if(!params.storeId) {
            return new NextResponse("Missing store id URL", { status: 400 })
        }

        const storeUserById = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if(!storeUserById) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const category = await db.category.create({
            data: {
                name,
                bannerId,
                storeId: params.storeId
            }
        })

        return new NextResponse(JSON.stringify(category), { status: 200 })

    } catch (error) {
        console.log("[CATEGORIES_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


export async function GET(request: Request, { params }: { params: { storeId: string } }) {
    try {
  
        if(!params.storeId) {
            return new NextResponse("Missing store id URL", { status: 400 })
        }


        const category = await db.category.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return new NextResponse(JSON.stringify(category), { status: 200 })

    } catch (error) {
        console.log("[CATEGORIES_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}