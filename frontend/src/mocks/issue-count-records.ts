interface IssueCountRecord {
  status: {
    timestamp: number;
  };
  count: number;
  assetType: 'xudt' | 'dob';
}

interface IssueCountChartDataPoint {
  timestamp: number;
  xudt: number;
  dob: number;
  total: number;
}

// 生成从现在开始往前推20天的数据，每天两条记录（xudt和dob）
const now = new Date().getTime()
const DAY_IN_MS = 24 * 60 * 60 * 1000

// 基础增长函数，模拟资产数量的自然增长
const getBaseCount = (daysAgo: number, isXUDT: boolean) => {
  const base = isXUDT ? 1000 : 500 // XUDT基数更大
  const growth = isXUDT ? 50 : 30 // XUDT增长更快
  return base + (20 - daysAgo) * growth + Math.floor(Math.random() * 20)
}

// 生成原始API数据格式
const issueCountRecordsFromApi = Array.from({ length: 20 })
  .flatMap((_, index) => {
    const timestamp = now - index * DAY_IN_MS

    // 生成每天的XUDT和DOB记录
    return [
      {
        status: {
          timestamp,
        },
        count: getBaseCount(index, true),
        assetType: 'xudt' as const,
      },
      {
        status: {
          timestamp,
        },
        count: getBaseCount(index, false),
        assetType: 'dob' as const,
      },
    ]
  })
  .sort((a, b) => a.status.timestamp - b.status.timestamp) // 按时间正序排列

// 转换数据为图表所需格式
export const mockIssueCountRecords = issueCountRecordsFromApi.reduce<IssueCountChartDataPoint[]>((acc, record) => {
  const timestamp = record.status.timestamp
  const existingPoint = acc.find(point => point.timestamp === timestamp)
  
  if (existingPoint) {
    if (record.assetType === 'xudt') {
      existingPoint.xudt = record.count
    } else {
      existingPoint.dob = record.count
    }
    existingPoint.total = existingPoint.xudt + existingPoint.dob
    return acc
  }
  
  return [...acc, {
    timestamp,
    xudt: record.assetType === 'xudt' ? record.count : 0,
    dob: record.assetType === 'dob' ? record.count : 0,
    total: 0
  }]
}, [])
