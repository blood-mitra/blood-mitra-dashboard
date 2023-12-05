import { useState } from "react";

import dayjs from "dayjs";

import {
  Box,
  Grid,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDebouncedState, useInputState } from "@mantine/hooks";

import { IconSearch } from "@tabler/icons-react";

import { RowsPerPage, TablePagination, Th } from "components";

import { useUsersData } from "./queries";

type Sort = "asc" | null;

export const Users = () => {
  const { colorScheme } = useMantineColorScheme();

  const [sort, setSort] = useState<Sort>("asc");

  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [searchTerm, setSearchTerm] = useDebouncedState("", 300);

  const [bloodType, setBloodType] = useState("");

  const [page, setPage] = useInputState(1);

  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(10);

  const handleSort = (field: Sort) => () => {
    const reversed = field === sort ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSort(field);
  };

  const { data, isLoading } = useUsersData({
    bloodGroup: bloodType,
    take: rowsPerPage,
    location: "",
    order: reverseSortDirection ? "desc" : "asc",
    skip: (page - 1) * rowsPerPage,
    searchTerm,
  });

  const rows = data?.data.data.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.bloodGroup}</Table.Td>
      <Table.Td>{element.phoneNumber}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{dayjs(element.createdAt).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>
        {element.donatedAt
          ? dayjs(element.donatedAt).format("DD/MM/YYYY")
          : "Null"}
      </Table.Td>
    </Table.Tr>
  ));
  const tableHeader = (
    <Table.Tr bg={colorScheme === "light" ? "gray.1" : "gray.7"}>
      <Th
        sorted={sort === "asc"}
        reversed={reverseSortDirection}
        onSort={handleSort("asc")}
      >
        Name
      </Th>
      <Table.Th>Blood Type</Table.Th>
      <Table.Th>Phone Number</Table.Th>
      <Table.Th>Location</Table.Th>
      <Table.Th>Created On</Table.Th>
      <Table.Th>Last Donated Date</Table.Th>
    </Table.Tr>
  );

  return (
    <Box>
      <LoadingOverlay visible={isLoading} />
      <Title order={1} mb={"20px"}>
        Users
      </Title>
      <Grid mt={24} mb="md">
        <Grid.Col span={10}>
          <TextInput
            mt={24}
            name="searchTerm"
            placeholder="Search by Name or Phone Number"
            rightSection={<IconSearch size={14} stroke={1.5} />}
            defaultValue={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            mb="md"
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select
            label="Pick Blood Type"
            placeholder="All"
            data={["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]}
            defaultValue={bloodType}
            onChange={(e) => setBloodType(e ?? "")}
          />
        </Grid.Col>
      </Grid>

      <Table
        mb="xl"
        horizontalSpacing="md"
        verticalSpacing="xs"
        highlightOnHover
        withTableBorder
        captionSide="bottom"
      >
        <Table.Thead>{tableHeader}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {Math.ceil((data?.data.meta.total ?? 0) / 10) > 1 && (
        <Group justify="space-between">
          <TablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            total={data?.data.meta.total ?? 0}
            onRowsPerPageChange={setRowsPerPage}
          />

          <Pagination
            value={page}
            total={Math.ceil((data?.data.meta.total ?? 0) / rowsPerPage)}
            onChange={setPage}
            withEdges
          />
        </Group>
      )}
    </Box>
  );
};
