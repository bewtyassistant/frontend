import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import useGetAnimation from "../_hooks/useGetAnimation"

export default function AppTable({
  headings,
  tableData,
  loading,
  showHeaderRow = true,
}: {
  headings: ReactNode[]
  tableData: ReactNode[][]
  loading?: boolean
  showHeaderRow?: boolean
}) {
  if (loading) return <Skeleton tableData={tableData} headings={headings} />
  return (
    <>
      <TableContainer minW="100%" overflowY="unset" overflowX="unset">
        <Table variant="simple" border="1px solid" borderColor="#FFE3E7">
          <Thead
            display={showHeaderRow ? "" : "none"}
            visibility={showHeaderRow ? "visible" : "hidden"}
            opacity={showHeaderRow ? 1 : 0}
            border="1px solid"
            borderColor="#FFE3E7"
          >
            <Tr border="1px solid" borderColor="#FFE3E7">
              {headings.map((heading, idx) => (
                <Th
                  key={idx}
                  fontSize="1.4rem"
                  color="#2E2E2E"
                  border="1px solid"
                  borderX="0"
                  borderColor="#FFE3E7"
                  textTransform="capitalize"
                  fontWeight="400"
                  h="6.4rem"
                >
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody border="1px solid" borderColor="#FFE3E7">
            {tableData.map((td, idx) => (
              <Tr key={idx} border="1px solid" borderColor="#FFE3E7">
                {td.map((data, dataIdx) => (
                  <Td
                    key={dataIdx}
                    border="1px solid"
                    borderX="0"
                    borderColor="#FFE3E7"
                    color="#9FA3AD"
                    fontSize="1.4rem"
                    h="6.4rem"
                  >
                    <Flex
                      justifyContent="center"
                      w="fit-content"
                      mx="auto"
                      alignItems="center"
                    >
                      {data}
                    </Flex>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

const Skeleton = ({
  headings,
  tableData,
}: {
  headings: ReactNode[]
  tableData: ReactNode[][]
}) => {
  const pulseAnimation = useGetAnimation()
  return (
    <>
      <TableContainer minW="100%" overflowY="unset" overflowX="unset">
        <Table variant="simple" border="1px solid" borderColor="#FFE3E7">
          <Thead border="1px solid" borderColor="#FFE3E7">
            <Tr border="1px solid" borderColor="#FFE3E7">
              {headings.map((_, idx) => (
                <Th
                  key={idx}
                  fontSize="1.4rem"
                  color="#2E2E2E"
                  border="1px solid"
                  borderX="0"
                  borderColor="#FFE3E7"
                  textTransform="capitalize"
                  fontWeight="400"
                  h="6.4rem"
                >
                  <Text
                    animation={pulseAnimation}
                    height="1rem"
                    w="5rem"
                    opacity=".1"
                    bgColor="currentColor"
                    rounded="1.2rem"
                  ></Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody border="1px solid" borderColor="#FFE3E7">
            {tableData.map((td, idx) => (
              <Tr key={idx} border="1px solid" borderColor="#FFE3E7">
                {td.map((_, dataIdx) => (
                  <Td
                    key={dataIdx}
                    border="1px solid"
                    borderX="0"
                    borderColor="#FFE3E7"
                    color="#9FA3AD"
                    fontSize="1.4rem"
                    h="6.4rem"
                  >
                    <Text
                      animation={pulseAnimation}
                      height="1rem"
                      w="5rem"
                      opacity=".1"
                      bgColor="currentColor"
                      rounded="1.2rem"
                    ></Text>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
