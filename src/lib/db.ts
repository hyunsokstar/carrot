
// 프리즈마 클라이언트를 이용해 db에 데이터를 생성하는 테스트 코드, src 폴더에 추가
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient();

async function test() {
    const token = await db.sMSToken.findUnique({
        where: {
            id: 1,
        },
        include: {
            user: true
        }
    })
    // console.log(token);
}


test();

export default db;
