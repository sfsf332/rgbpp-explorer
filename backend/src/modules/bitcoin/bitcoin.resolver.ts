import { Float, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BitcoinApiService } from 'src/core/bitcoin-api/bitcoin-api.service';
import { BitcoinBaseChainInfo, BitcoinChainInfo, BitcoinFees } from './bitcoin.model';
import { Loader } from 'src/common/dataloader';
import {
  BitcoinBlockTxidsLoader,
  BitcoinBlockTxidsLoaderType,
} from './block/dataloader/block-txids.dataloader';
import { ComplexityType } from '../complexity.plugin';

// 60 * 24 = 1440 minutes
const BLOCK_NUMBER_OF_24_HOURS = 144;

@Resolver(() => BitcoinChainInfo)
export class BitcoinResolver {
  constructor(private bitcoinApiService: BitcoinApiService) { }

  @Query(() => BitcoinChainInfo, { name: 'btcChainInfo', complexity: ComplexityType.RequestField })
  public async chainInfo(): Promise<BitcoinBaseChainInfo> {
    const info = await this.bitcoinApiService.getBlockchainInfo();
    return BitcoinChainInfo.from(info);
  }

  @ResolveField(() => Float, { complexity: ComplexityType.RequestField })
  public async transactionsCountIn24Hours(
    @Parent() chainInfo: BitcoinBaseChainInfo,
    @Loader(BitcoinBlockTxidsLoader) blockTxidsLoader: BitcoinBlockTxidsLoaderType,
  ): Promise<number> {
    const blockNumbers = Array.from(
      { length: BLOCK_NUMBER_OF_24_HOURS },
      (_, i) => chainInfo.tipBlockHeight - i,
    );
    const txidsCollection = await blockTxidsLoader.loadMany(
      blockNumbers.map((blockNumber) => ({ height: blockNumber })),
    );
    // XXX: what if some of the blocks are not fetched? (due to network issue or else)
    const count = txidsCollection
      .map((txs) => (txs instanceof Array ? txs : []))
      .reduce((acc, txs) => acc + txs?.length ?? 0, 0);
    return count;
  }

  @ResolveField(() => BitcoinFees, { complexity: ComplexityType.RequestField })
  public async fees(): Promise<BitcoinFees> {
    const fees = await this.bitcoinApiService.getFeesRecommended();
    return BitcoinFees.from(fees);
  }
}
