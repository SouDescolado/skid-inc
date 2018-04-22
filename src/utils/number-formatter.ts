const numberPrefixes = [
  'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n',
  'D', 'UD', 'DD', 'TD', 'qD', 'QD', 'sD', 'SD', 'OD', 'ND',
  'V', 'UV', 'DV', 'TV', 'qV', 'QV', 'sV', 'SV', 'OV', 'NV',
  'T', 'UT', 'DT', 'TT', 'qT', 'QT', 'sT', 'ST', 'OT', 'NT',
];

/** Return the number of units in a number: 1e32 = 32 */
const logFloor = (value: number): number => {
  let count = 0;

  while (value >= 10) {
    count++;
    value /= 10;
  }

  return count;
};

/** Return a properly formatted string: 1000 = 1,000 */
const numberWithCommas = (value: string): string => {
  const parts = value.toString().split('.');

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
};

/** Return a nicely formatted number with proper commas and prefixes */
export const format = (num: number): string => {
  if (num >= 1e6) {
    const floor = Math.floor(logFloor(num) / 3);
    const str = format(num / Math.pow(10, 3 * floor));
    return str + '' + numberPrefixes[floor - 2];
  } else if (num <= 0) {
    return '0';
  } else {
    /**
     * If the number is a float, we assume it's a number >= 1e6 which needs 3 decimals,
     * otherwise we put 2 decimals by default: $100.00, $100.000b
     */
    if (num % 1 === 0) {
      return numberWithCommas(num.toFixed(2));
    } else {
      return numberWithCommas(num.toFixed(3));
    }
  }
};
