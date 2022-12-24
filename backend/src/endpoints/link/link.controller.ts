import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(@Inject(LinkService) private readonly linkService: LinkService) {}

  @Get(':link')
  async getLink(@Param('link') link: string, @Res() response: Response) {
    const url = await this.linkService.getLink(link);

    return response.redirect(url);
  }
}
