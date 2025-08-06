import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/dev-config.service.provider';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}

  getHello() {
    return `Hello i am nest ${this.devConfigService.getDBHOST()} PORT = ${this.config.port}`;
  }
}
