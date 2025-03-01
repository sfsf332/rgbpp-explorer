'use client'

import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, SkeletonProps } from '@/components/ui/primitives/skeleton'
import { QueryKey } from '@/constants/query-key'
import { graphql } from '@/gql'
import { BitcoinTransaction, CkbTransaction } from '@/gql/graphql'
import { graphQLClient } from '@/lib/graphql'
import { useBtcTransaction } from '@/hooks/useRgbppData'

const btcTransactionQuery = graphql(`
  query BtcTransactionByTxId($txid: String!) {
    btcTransaction(txid: $txid) {
      txid
      fee
      feeRate
      confirmations
      transactionTime
      vin {
        txid
        vout
        isCoinbase
        prevout {
          txid
          vout
          value
          address {
            address
          }
          status {
            spent
            txid
            vin
          }
        }
      }
      vout {
        txid
        vout
        value
        address {
          address
        }
        status {
          spent
          txid
          vin
        }
      }
    }
  }
`)

const btcRgbppTransactionQuery = graphql(`
  query BtcRgbppTransactionByTxId($txid: String!) {
    btcTransaction(txid: $txid) {
      rgbppTransaction {
        ckbTransaction {
          outputs {
            txHash
            index
            capacity
            cellType
            type {
              codeHash
              hashType
              args
            }
            lock {
              codeHash
              hashType
              args
            }
            status {
              consumed
              txHash
              index
            }
            xudtInfo {
              symbol
              amount
              decimal
              typeHash
            }
          }
          inputs {
            txHash
            index
            capacity
            cellType
            type {
              codeHash
              hashType
              args
            }
            lock {
              codeHash
              hashType
              args
            }
            xudtInfo {
              symbol
              amount
              decimal
              typeHash
            }
            status {
              consumed
              txHash
              index
            }
          }
        }
      }
    }
  }
`)

interface Props extends Omit<SkeletonProps, 'children'> {
  txid: string
  children: (
    btcTransaction: BitcoinTransaction,
    ckbTransaction?: Pick<CkbTransaction, 'inputs' | 'outputs'>,
  ) => ReactNode
  fallback?: ReactNode
}

export function BtcTransactionInViewQuery({ txid, children, fallback }: Props) {
  const [enabled, setEnabled] = useState(false)
  const [ref] = useInView({
    threshold: 0,
    onChange(view) {
      if (view) setEnabled(true)
    },
  })

  const { btcTransaction: data, isLoading, error } = useBtcTransaction(txid)

  const { data: ckbTx } = useQuery({
    queryKey: [QueryKey.BtcTransactionCardWithQueryInAddress, txid, 'rgbpp'],
    async queryFn() {
      const { btcTransaction } = await graphQLClient.request(btcRgbppTransactionQuery, {
        txid,
      })
      return btcTransaction?.rgbppTransaction?.ckbTransaction
    },
  })

  if (error) return fallback

  return (
    <Skeleton ref={ref} isLoaded={!isLoading} minH={!data ? '480px' : 'auto'} w="100%">
      {data
        ? children(data as unknown as BitcoinTransaction, ckbTx as Pick<CkbTransaction, 'inputs' | 'outputs'>)
        : null}
    </Skeleton>
  )
}
