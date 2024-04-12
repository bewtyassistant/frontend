import { Text } from "@chakra-ui/react"
import Status from "../_types/Status"
import CheckMark from "../_assets/CheckMark"

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

export function getStatusRepresentation(status: Status) {
  if (status === Status.FULFILLED) return <CheckMark />
  else if (status === Status.PENDING) return <Text color="orange">Pending</Text>
  else if (status === Status.CANCELLED)
    return <Text color="red">Cancelled</Text>
  else return
}
