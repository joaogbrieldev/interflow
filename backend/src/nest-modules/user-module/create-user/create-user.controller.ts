import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

@Controller('reports')
export class ReportController {
  @Get('download')
  async downloadReport(@Query('email') email: string, @Res() res: Response) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const zipPath = path.join(os.tmpdir(), `${email}-inv.zip`);

    if (!fs.existsSync(zipPath)) {
      throw new NotFoundException('File not found');
    }

    res.download(zipPath, `${email}-inv.zip`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        throw new NotFoundException('Error downloading file');
      }
    });
  }
}
