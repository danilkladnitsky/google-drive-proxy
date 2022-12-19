import { Controller, Get, Inject, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(@Inject(LinkService) private readonly linkService: LinkService) {}

  @Get(':link')
  async getLink(@Param('link') link: string) {
    return await this.linkService.getLink(link);
  }
}
