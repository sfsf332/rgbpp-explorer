import { type ReactNode } from 'react'

// 链类型枚举
export type Chain = 'BTC' | 'CKB' | 'DOGE'

// 持有人数据
export interface HolderData {
  rank: number
  address: string
  chain: Chain
  value: number
}

// 持有人汇总信息
export interface HolderSummary {
  totalHolders: number
  chainHolders: {
    btc: number
    ckb: number
    doge: number
  }
}

// 分页参数
export interface PaginationParams {
  pageSize: number
  page: number
  total: number
}

// 排序参数
export interface SortParams {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

// API 响应数据
export interface GetHoldersResponse {
  holders: HolderData[]
  totalSupply: number
  summary: HolderSummary
  pagination: PaginationParams
  sort?: SortParams
}

export interface HolderSummaryCardProps {
  label: ReactNode
  value: number
  icon?: ReactNode
  isTotalHolders?: boolean
}
