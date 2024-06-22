import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
    { params }: { params: {  categoryId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!params.categoryId) {
        return new NextResponse("Banner ID is required", { status: 400 });
      }
  
      const category = await db.category.findUnique({
        where: {
          id: params.categoryId,
        },
      });

      return NextResponse.json(category);
    } catch (error) {
      console.log("[CATEGORIES_GET]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }



export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name, bannerId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!bannerId) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.categoryId) {
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

    const category = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        bannerId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoryId) {
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

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
