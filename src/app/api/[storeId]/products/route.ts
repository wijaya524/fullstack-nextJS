import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const {userId} = auth()
        const body = await request.json()
        const {name, price, images, categoryId, isFeatured, isArchived} = body

        if(!name) {
            return new NextResponse("Missing label", { status: 400 })
        }
        if(!price) {
            return new NextResponse("Missing image", { status: 400 })
        }
        if(!images || !images.length) {
            return new NextResponse("Missing image", { status: 400 })
        }   
        if(!categoryId) {
            return new NextResponse("Missing category", { status: 400 })
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

        const product = await db.product.create({
            data: {
                name,
                price,
                images: {
                  createMany: {
                    data: [
                      ...images.map((image: { url: string }) => ({
                        url: image.url,
                      })),
                    ]
                  }
                },
                categoryId,
                isFeatured,
                isArchived,
                storeId: params.storeId
            }
        })

        return new NextResponse(JSON.stringify(product), { status: 200 })

    } catch (error) {
        console.log("[PRODUCTS_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


export async function GET(request: Request, { params }: { params: { storeId: string } }) {
    try {
  
        if(!params.storeId) {
            return new NextResponse("Missing store id URL", { status: 400 })
        }

        const {searchParams} = new URL(request.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const isFeatured = searchParams.get("isFeatured") 


        const products = await db.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                category: true,
                images: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return new NextResponse(JSON.stringify(products), { status: 200 })

    } catch (error) {
        console.log("[PRODUCTS_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}