import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
    { params }: { params: {  productId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!params.productId) {
        return new NextResponse("Product ID is required", { status: 400 });
      }
  
      const product = await db.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          images: true,
          category: true,
        },
      });

      return NextResponse.json(product);
    } catch (error) {
      console.log("[PRODUCT_GET]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }



export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) 
{
  try {
    const { userId } = auth();
    const body = await request.json();
    const {name, price, images, categoryId, isFeatured, isArchived} = body


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
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
    if (!params.productId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeUserById = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeUserById) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

     await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        images: {
          deleteMany: {},
        }
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }

}


export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Banner ID is required", { status: 400 });
    }

    const storeUserById = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeUserById) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
