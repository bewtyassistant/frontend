export function getArrayOfNumbersArithimeticallyIncreasingByOne({
  length,
  start = 1,
}: {
  length: number
  start?: number
}) {
  let array = new Array(length)
  array = array.fill(0)
  array = array.map((_, index) => index + start)
  return array
}
