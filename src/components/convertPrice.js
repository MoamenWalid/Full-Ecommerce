
export function convertPrice(price) {
  const formattedNumber = price.toLocaleString("en-US");
  return formattedNumber;
}