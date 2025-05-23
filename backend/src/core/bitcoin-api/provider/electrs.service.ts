import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { IBitcoinDataProvider } from '../bitcoin-api.interface';
import {
  Address,
  Block,
  OutSpend,
  RecommendedFees,
  Transaction,
  UTXO,
} from '../bitcoin-api.schema';
import { HttpException } from '@nestjs/common';
import * as https from 'node:https';
import * as http from 'node:http';

export class ElectrsService implements IBitcoinDataProvider {
  private request: AxiosInstance;

  constructor(baseURL: string) {
    const config: CreateAxiosDefaults = {
      baseURL,
    };
    const url = new URL(baseURL);
    if (url.protocol === 'https:') {
      config.httpsAgent = new https.Agent({ keepAlive: true });
    } else {
      config.httpAgent = new http.Agent({ keepAlive: true });
    }
    this.request = axios.create(config);
  }

  public async getFeesRecommended(): Promise<RecommendedFees> {
    throw new HttpException('Electrs: Recommended fees not available', 500);
  }

  public async getAddress({ address }: { address: string }) {
    const response = await this.request.get<Address>(`/address/${address}`);
    return response.data;
  }

  public async getAddressTxsUtxo({ address }: { address: string }) {
    const response = await this.request.get<UTXO[]>(`/address/${address}/utxo`);
    return response.data;
  }

  public async getAddressTxs({ address, afterTxid }: { address: string; afterTxid?: string }) {
    let url = `/address/${address}/txs`;
    if (afterTxid) {
      url += `?after_txid=${afterTxid}`;
    }
    const response = await this.request.get<Transaction[]>(url);
    return response.data.map((tx: unknown) => Transaction.parse(tx));
  }

  public async getTx({ txid }: { txid: string }) {
    const response = await this.request.get<Transaction>(`/tx/${txid}`);
    return Transaction.parse(response.data);
  }

  public async getTxHex({ txid }: { txid: string }) {
    const response = await this.request.get<string>(`/tx/${txid}/hex`);
    return response.data;
  }

  public async getTxOutSpend({ txid, vout }: { txid: string; vout: number }) {
    const response = await this.request.get<OutSpend>(`/tx/${txid}/outspend/${vout}`);
    return OutSpend.parse(response.data);
  }

  public async getTxOutSpends({ txid }: { txid: string }) {
    const response = await this.request.get<OutSpend[]>(`/tx/${txid}/outspends`);
    return response.data.map((outSpend) => OutSpend.parse(outSpend));
  }

  public async getTransactionTimes({ txids }: { txids: string[] }) {
    const response = await this.request.post<number[]>('/v1/transaction-times', { txId: txids });
    return response.data as number[];
  }

  public async getBlock({ hash }: { hash: string }) {
    const response = await this.request.get<Block>(`/block/${hash}`);
    return Block.parse(response.data);
  }

  public async getBlockTxs({ hash, startIndex }: { hash: string; startIndex?: number }) {
    let url = `/block/${hash}/txs`;
    if (startIndex) {
      url += `/${startIndex}`;
    }
    const response = await this.request.get<Transaction[]>(url);
    return response.data.map((tx: unknown) => Transaction.parse(tx));
  }

  public async getBlockHeight({ height }: { height: number }) {
    const response = await this.request.get<string>(`/block-height/${height}`);
    return response.data;
  }

  public async getBlockHeader({ hash }: { hash: string }) {
    const response = await this.request.get<string>(`/block/${hash}/header`);
    return response.data;
  }

  public async getBlockTxids({ hash }: { hash: string }) {
    const response = await this.request.get<string[]>(`/block/${hash}/txids`);
    return response.data;
  }

  public async getBlocksTipHash() {
    const response = await this.request.get<string>('/blocks/tip/hash');
    return response.data;
  }
}
