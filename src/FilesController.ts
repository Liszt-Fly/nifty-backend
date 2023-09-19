import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express'
import { GenerateJsonService } from "./generate-json/generate-json.service";
@Controller("files.json")
export class FileController {
    constructor(private readonly generateJSON: GenerateJsonService) { }
    @Get()
    getUpdateFile(@Res() res: Response): any {
        this.generateJSON.generateFile()
        let con = this.generateJSON.constructorJSON()
        console.log(con)
        const jsonData = {
            key1: "value1",
            key2: "value2"
        }

        return jsonData
    }
}