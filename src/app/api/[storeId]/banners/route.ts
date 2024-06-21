import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const {userId} = auth()
        const body = await request.json()
        const {label, imageUrl} = body

        if(!label) {
            return new NextResponse("Missing label", { status: 400 })
        }
        if(!imageUrl) {
            return new NextResponse("Missing image", { status: 400 })
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

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return new NextResponse(JSON.stringify(banner), { status: 200 })

    } catch (error) {
        console.log("[BANNERS_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


export async function GET(request: Request, { params }: { params: { storeId: string } }) {
    try {
  
        if(!params.storeId) {
            return new NextResponse("Missing store id URL", { status: 400 })
        }


        const banner = await db.banner.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return new NextResponse(JSON.stringify(banner), { status: 200 })

    } catch (error) {
        console.log("[BANNERS_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}