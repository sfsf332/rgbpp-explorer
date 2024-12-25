import { toCamelcase } from '@rgbpp-sdk/ckb'
import { AxiosResponse } from 'axios'

import { requesterV1, requesterV2 } from '@/services/requester'
import { Response } from '@/services/types'

async function v1Get<T>(...args: Parameters<typeof requesterV1.get>) {
  return requesterV1.get(...args).then((res) => toCamelcase<Response.Response<T>>(res.data))
}

interface XUDT {
  symbol: string
  decimal: string
  amount: string
  typeHash: string
  udtIconFile: string
  udtType: 'xudt' | 'xudt_compatible'
}

const v1GetWrapped = <T>(...args: Parameters<typeof v1Get>) =>
  v1Get<Response.Wrapper<T>>(...args).then((res) => res?.data)

const v1GetUnwrapped = <T>(...args: Parameters<typeof v1GetWrapped>) =>
  v1GetWrapped<T>(...args).then((wrapper) => wrapper?.attributes)

const v1GetUnwrappedPagedList = <T>(...args: Parameters<typeof v1GetWrapped>) =>
  v1Get<Array<Response.Wrapper<T>>>(...args).then(res => {
    return {
      data: res?.data.map(wrapper => ({ ...wrapper.attributes, cellId: wrapper.id })),
      ...res?.meta,
    }
  })

export const apiFetcher = {
  fetchStatistics: () =>
    v1GetUnwrapped<{
      tipBlockNumber: string
      averageBlockTime: string
      currentEpochDifficulty: string
      hashRate: string
      epochInfo: {
        epochNumber: string
        epochLength: string
        index: string
      }
      estimatedEpochTime: string
      transactionsLast24Hrs: string
      transactionsCountPerMinute: string
      reorgStartedAt: string | null
    }>(`statistics`),

  fetchXudts: (page: number, size: number, sort?: string, tags?: string, union?: string) =>
    v1GetUnwrappedPagedList<XUDT>(`/xudts`, {
      params: {
        page,
        page_size: size,
        sort,
        tags,
        union: union ?? 'false',
      },
    }),

  fetchRGBTransactions: async (page: number, size: number, sort?: string, leapDirection?: string) =>
    requesterV2('/rgb_transactions', {
      params: {
        page,
        page_size: size,
        sort,
        leap_direction: leapDirection,
      },
    }).then((res: AxiosResponse) =>
      toCamelcase<{
        data: {
          ckbTransactions: RGBTransaction[]
        }
        meta: {
          total: number
          pageSize: number
        }
      }>(res.data),
    ),
}

// ====================
// Types
// ====================

export type APIFetcher = typeof apiFetcher

export type APIReturn<T extends keyof APIFetcher> = Awaited<ReturnType<APIFetcher[T]>>

export interface RGBTransaction {
  ckbTransaction: any
  txHash: string
  blockId: number
  blockNumber: number
  blockTimestamp: number
  leapDirection: string
  rgbCellChanges: number
  rgbTxid: string
}
