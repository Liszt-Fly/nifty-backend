import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileController } from './FilesController';
import { GenerateJsonService } from './generate-json/generate-json.service';

@Module({
  imports: [],
  controllers: [AppController, FileController],
  providers: [AppService, GenerateJsonService],
})
export class AppModule { }
