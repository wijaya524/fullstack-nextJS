import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const {userId} = auth()
        const body = await request.json()
        const {name} = body

        if(!name) {
            return new NextResponse("Missing name", { status: 400 })
        }

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const store = await db.store.create({
            data: {
                name,
                userId
            }
        })

        return new NextResponse(JSON.stringify(store), { status: 200 })

    } catch (error) {
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}