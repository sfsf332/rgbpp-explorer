import { forwardRef, Global, Module } from '@nestjs/common';
import { CkbExplorerService } from './ckb-explorer.service';
import { CkbRpcModule } from '../ckb-rpc/ckb-rpc.module';
import { CkbExplorerHealthIndicator } from './ckb-explorer.health';

@Global()
@Module({
  imports: [forwardRef(() => CkbRpcModule)],
  providers: [CkbExplorerService, CkbExplorerHealthIndicator],
  exports: [CkbExplorerService, CkbExplorerHealthIndicator],
})
export class CkbExplorerModule {}
