interface HolderCountRecord {
  status: {
    timestamp: number;
  };
  network: 'ckb' | 'btc' | 'doge';
  count: number;
}

interface HolderCountChartDataPoint {
  timestamp: number;
  ckb: number;
  btc: number;
  doge: number;
  total: number;
}

// 生成从现在开始往前推100天的数据，每天三条记录（ckb、btc和doge）
const now = new Date().getTime()
const DAY_IN_MS = 24 * 60 * 60 * 1000

// 基础增长函数，模拟持有者数量的自然增长
const getBaseCount = (daysAgo: number, network: 'ckb' | 'btc' | 'doge') => {
  // 设置不同网络的基数和增长率
  const baseConfig = {
    ckb: { base: 2000, growth: 80 },    // CKB最活跃
    btc: { base: 1500, growth: 60 },    // BTC次之
    doge: { base: 800, growth: 40 },    // DOGE相对较少
  }

  const { base, growth } = baseConfig[network]
  // 添加一些随机波动使数据更自然
  const randomFactor = Math.floor(Math.random() * 30 - 15) // -15 到 15 的随机数
  return base + (100 - daysAgo) * growth + randomFactor
}

// 生成原始API数据格式
const holderCountRecordsFromApi = Array.from({ length: 100 })
  .flatMap((_, index) => {
    const timestamp = now - index * DAY_IN_MS

    // 生成每天的CKB、BTC和DOGE记录
    return ['ckb', 'btc', 'doge'].map(network => ({
      status: {
        timestamp,
      },
      count: getBaseCount(index, network as 'ckb' | 'btc' | 'doge'),
      network: network as 'ckb' | 'btc' | 'doge',
    }))
  })
  .sort((a, b) => a.status.timestamp - b.status.timestamp) // 按时间正序排列

// 转换为图表所需的数据格式
export const mockHolderCountRecords: HolderCountChartDataPoint[] = Array.from({ length: 100 })
  .map((_, index) => {
    const dayRecords = holderCountRecordsFromApi.slice(index * 3, (index + 1) * 3)
    const timestamp = dayRecords[0].status.timestamp
    const ckb = dayRecords.find(r => r.network === 'ckb')?.count || 0
    const btc = dayRecords.find(r => r.network === 'btc')?.count || 0
    const doge = dayRecords.find(r => r.network === 'doge')?.count || 0
    
    return {
      timestamp,
      ckb,
      btc,
      doge,
      total: ckb + btc + doge,
    }
  })
