'use client'

import { Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { VStack } from 'styled-system/jsx'

import { BtcUtxoTables } from '@/components/btc/btc-utxo-tables'
import { TransactionHeaderInAddress } from '@/components/transaction-header-in-address'
import { UtxoOrCellFooter } from '@/components/utxo-or-cell-footer'
import { BitcoinTransaction, CkbTransaction } from '@/types/graphql'

export const BtcTransactionCardInAddress = forwardRef<
  HTMLDivElement,
  {
    tx: Pick<BitcoinTransaction,'txid' | 'vin' | 'vout' | 'fee' >
    ckbCell?: Pick<CkbTransaction, 'display_inputs' | 'display_outputs'>
    address: string
  }
>(function BtcTransactionCardInAddress({ tx, address, ckbCell }, ref) {




  return (
    <VStack key={tx.txid} w="100%" gap={0} bg="bg.card" rounded="8px" ref={ref}>
      <TransactionHeaderInAddress  txid={tx.txid} btcTime />
      <BtcUtxoTables
        txid={tx.txid}
        vin={tx.vin}
        vout={tx.vout}
        // ckbCell={formattedCkbCell}
        currentAddress={address}
      />
      <UtxoOrCellFooter
        txid={tx.txid}
        fee={tx.fee}
        // confirmations={tx.confirmations}
        // feeRate={tx.feeRate}
        feeUnit={<Trans>sats</Trans>}
        sizeUnit={<Trans>vB</Trans>}
        address={address}
        // btcUtxo={{ vin: tx.vin ?? [], vout: tx.vout ?? [] }}
        // ckbCell={formattedCkbCell}
      />
    </VStack>
  )
})
