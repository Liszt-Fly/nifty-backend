import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { createFileSync, existsSync } from 'fs-extra';
import { resolve } from 'path';
@Injectable()
export class GenerateJsonService {
    static ResourcesPath: string = "Resources"
    //如果没有对应的json文件,创建json
    generateFile() {
        this.constructorJSON()
        let jsonPath = resolve(GenerateJsonService.ResourcesPath, "updater.json")
        if (!existsSync(jsonPath)) {
            createFileSync(jsonPath)
        }
    }
    constructorJSON(version: string = "0.0.0") {
        let urlPath = resolve(GenerateJsonService.ResourcesPath, "urls.json")
        let content = readFileSync(urlPath, { encoding: "utf-8" })
        let url = JSON.parse(content)
        let specificPlatforms: platrform[] = []
        url.forEach(item => {
            let platform = Object.keys(item)[0] as specificPlatform
            let platfrom: platrform = {
                [platform]: platform,
                signature: "",
                url: "https://qiaoyangedu.top"
            }
            specificPlatforms.push(platfrom)
        })
        let pub_date = new Date().toISOString()
        let notes = `the${version} has released,you can download it immediately`
        let target_json: updater = {
            version,
            notes, pub_date, platforms: specificPlatforms
        }
        return JSON.stringify(target_json, null, 2)
    }
}
