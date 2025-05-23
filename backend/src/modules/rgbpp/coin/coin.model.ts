import { toNumber } from 'lodash';
import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CkbScript } from 'src/modules/ckb/script/script.model';
import * as CkbExplorer from 'src/core/ckb-explorer/ckb-explorer.interface';

registerEnumType(CkbExplorer.TransactionListSortType, {
  name: 'TransactionListSortType',
});

@ObjectType({ description: 'RGB++ Coin' })
export class RgbppCoin {
  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String)
  symbol: string;

  @Field(() => Float)
  decimal: number;

  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => String, { nullable: true })
  typeHash: string | null;

  @Field(() => CkbScript, { nullable: true })
  typeScript: CkbScript | null;

  @Field(() => Int)
  h24CkbTransactionsCount: number;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => String)
  issuer: string;

  @Field(() => Date)
  deployedAt: Date;

  public static from(xudt: CkbExplorer.XUDT): RgbppCoin | null {
    if (!xudt) {
      return null;
    }
    return {
      name: xudt.full_name,
      description: xudt.description,
      symbol: xudt.symbol ?? xudt.type_hash.slice(0, 6),
      decimal: toNumber(xudt.decimal),
      icon: xudt.icon_file,
      typeHash: xudt.type_hash,
      typeScript: CkbScript.from(xudt.type_script),
      h24CkbTransactionsCount: toNumber(xudt.h24_ckb_transactions_count),
      totalAmount: toNumber(xudt.total_amount),
      issuer: xudt.issuer_address,
      deployedAt: new Date(toNumber(xudt.created_at)),
    };
  }
}

@ObjectType({ description: 'RGB++ Coin List' })
export class RgbppCoinList {
  @Field(() => [RgbppCoin])
  coins: RgbppCoin[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pageSize: number;
}
