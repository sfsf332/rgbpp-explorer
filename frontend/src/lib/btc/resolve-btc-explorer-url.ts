export function resolveBtcExplorerUrl(hash: string, type: 'transaction' | 'address' | 'block') {
  const baseUrl = 'https://blockstream.info'
  switch (type) {
    case 'transaction':
      return `${baseUrl}/tx/${hash}`
    case 'address':
      return `${baseUrl}/address/${hash}`
    case 'block':
      return `${baseUrl}/block/${hash}`
    default:
      return baseUrl
  }
} 