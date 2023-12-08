import { Group, Select, Text } from "@mantine/core";

export type RowsPerPage = 10 | 25 | 50 | 100;

interface Props {
  page: number;
  rowsPerPage: RowsPerPage;
  total: number;
  onRowsPerPageChange: (noOfRows: RowsPerPage) => void;
}

export const TablePagination = ({
  page,
  rowsPerPage,
  total,
  onRowsPerPageChange,
}: Props) => {
  const handleChange = (value: string | null) =>
    onRowsPerPageChange((Number(value) || 10) as RowsPerPage);

  return (
    <Group>
      <Select
        data={[
          { value: "10", label: "10" },
          { value: "25", label: "25" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
        value={rowsPerPage.toString()}
        onChange={handleChange}
      />

      <Text>
        {total === 0 ? 0 : (page - 1) * rowsPerPage + 1}-
        {page * rowsPerPage > total ? total : page * rowsPerPage} of {total}
      </Text>
    </Group>
  );
};
