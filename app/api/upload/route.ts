// // app/api/upload/route.ts
// import { db } from '@/db'
// import { products } from '@/db/schema'
// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   const body = await req.json()
//   const { name, email } = body

//   try {
//     const result = await db.insert(products).values({ name, email }).returning()
//     return NextResponse.json({ success: true, data: result })
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, error: (err as Error).message },
//       { status: 500 }
//     )
//   }
// }
