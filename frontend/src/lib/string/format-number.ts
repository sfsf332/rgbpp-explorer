import BigNumber from 'bignumber.js'
import { isNaN, isNull, isUndefined } from 'lodash-es'

export function formatNumber(value?: BigNumber.Value | null, decimal?: number) {
  if (isUndefined(value) || isNull(value) || isNaN(value)) return '-'
  const val = BigNumber(value)
  if (decimal) {
    return val.div(BigNumber(10).pow(decimal)).toFormat()
  }
  return val?.toFormat() ?? '-'
}

export function formatBigNumber(
  value?: BigNumber.Value | null,
  decimal: number = 2,
  lang: string = 'en'
): string {
  if (isUndefined(value) || isNull(value) || isNaN(value)) return '-';

  const val = new BigNumber(value);
  let units: string[] = [];
  let scale: number[] = []; 

  if (lang === 'zh') {
    units = ['', '千', '万', '亿', '万亿'];
    scale = [1, 1_000, 1_0000, 1_0000_00000, 1_0000_0000_0000]; 
  } else {
    units = ['', 'K', 'M', 'B', 'T'];
    scale = [1, 1_000, 1_000_000, 1_000_000_000, 1_000_000_000_000]; 
  }

  // find the best unit
  let unitIndex = 0;
  while (unitIndex < units.length - 1 && val.abs().gte(scale[unitIndex + 1])) {
    unitIndex++;
  }

  // scale to the appropriate unit
  const scaledValue = val.div(scale[unitIndex]);

  // format the number and keep decimal places
  const formattedValue = scaledValue.toFormat(decimal);

  return `${formattedValue}${units[unitIndex]}`;
}