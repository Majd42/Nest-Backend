
import * as path from 'path'
import * as fs from 'fs'
import { InternalServerErrorException } from '@nestjs/common'

const saveFile =(file: Express.Multer.File) => {
    try {
        const timestamp = Date.now();

          const fileName = `${timestamp}-${file.originalname}`;
        const imagePath = path.join(__dirname, '..', '..', 'public', 'images', fileName)
     
        fs.writeFileSync(imagePath, file.buffer)
        return fileName
   
    } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('internal server error ', error)
    }
}


export default saveFile