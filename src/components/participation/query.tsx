import {
  Card,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Link,
  Select,
  SimpleGrid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import StateIcon from "../utils/stateIcon";
import { useSubs } from "./useSubs";
import Pagination from "../utils/pagination";

const YourParticipation = () => {
  const { pageIndex, totalNum, setPageIndex, subs, setState, state } =
    useSubs();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };
  return (
    <Card mt={20} minH="810px">
      <SimpleGrid columns={5} m={5}>
        <GridItem colSpan={1}>
          <HStack>
            <Text>Status:</Text>
            <Select
              placeholder="Select option"
              value={state}
              onChange={handleSelectChange}
            >
              {/* <option value="0">Invalid</option> */}
              <option value="0">All</option>
              <option value="1">Init</option>
              <option value="2">Approved</option>
              <option value="3">Rejected</option>
            </Select>
          </HStack>
        </GridItem>
      </SimpleGrid>
      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Experiment ID</Th>
                <Th>state</Th>
                <Th>finished_at</Th>
              </Tr>
            </Thead>
            {subs !== null &&
              subs !== undefined &&
              subs.map((v, k) => (
                <Tr key={k}>
                  <Th>{v.sid}</Th>
                  <Th>
                    <Link href={`/detail/${v.eid}`}>{v.eid}</Link>
                  </Th>
                  <Th>
                    {v.state !== undefined && <StateIcon state={v.state} />}
                  </Th>
                  <Th>{v.finished_at}</Th>
                </Tr>
              ))}
          </Table>
        </TableContainer>
      </CardBody>
      <Pagination
        currentPage={pageIndex}
        totalPages={totalNum % 10 == 0 ? totalNum / 10 : totalNum / 10 + 1}
        onPageChange={setPageIndex}
      />
    </Card>
  );
};

export default YourParticipation;
