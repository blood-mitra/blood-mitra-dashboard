import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { IconCalendar } from "@tabler/icons-react";

import dayjs from "dayjs";

import { useGetStats } from "./queries";

export const Dashboard = () => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);

  const [dateTo, setDateTo] = useState<Date | null>(null);

  const [filter, setFilter] = useState("All");

  const { data, isFetching } = useGetStats({
    dateFrom: dateFrom
      ? dayjs(dateFrom).format("YYYY-MM-DD").toString()
      : undefined,
    dateTo: dateTo ? dayjs(dateTo).format("YYYY-MM-DD").toString() : undefined,
  });

  const handleSetFilter = (val: string) => {
    return () => setFilter(val);
  };

  useEffect(() => {
    setDateTo(new Date());
    if (filter === "All") {
      setDateFrom(null);
      setDateTo(null);
    } else if (filter === "Today") {
      setDateFrom(new Date());
    } else if (filter === "Week") {
      setDateFrom(dayjs().subtract(1, "week").toDate());
    } else if (filter === "Month") {
      setDateFrom(dayjs().subtract(1, "month").toDate());
    }
  }, [filter]);

  return (
    <Box>
      <Title order={1} mb={"20px"}>
        Home
      </Title>
      <Flex gap={120} mt={24} mb={32}>
        <DatePickerInput
          w={250}
          valueFormat="DD/MM/YYYY"
          label="Date From"
          placeholder="Select Date"
          rightSection={<IconCalendar size={14} stroke={1.5} />}
          value={dateFrom}
          onChange={setDateFrom}
          maxDate={dayjs().toDate()}
        />
        <DatePickerInput
          w={250}
          valueFormat="DD/MM/YYYY"
          label="Date To"
          placeholder="Select Date"
          rightSection={<IconCalendar size={14} stroke={1.5} />}
          minDate={dateFrom ?? undefined}
          value={dateTo}
          maxDate={dayjs().toDate()}
          onChange={setDateTo}
        />
      </Flex>
      <Group mb={32}>
        <Button
          variant={filter === "All" ? "filled" : "light"}
          radius={20}
          onClick={handleSetFilter("All")}
        >
          All
        </Button>
        <Button
          variant={filter === "Today" ? "filled" : "light"}
          radius={20}
          onClick={handleSetFilter("Today")}
        >
          Today
        </Button>
        <Button
          variant={filter === "Week" ? "filled" : "light"}
          radius={20}
          onClick={handleSetFilter("Week")}
        >
          This Week
        </Button>
        <Button
          variant={filter === "Month" ? "filled" : "light"}
          radius={20}
          onClick={handleSetFilter("Month")}
        >
          This Month
        </Button>
      </Group>

      <SimpleGrid cols={3}>
        <Paper p="md" shadow="lg" radius="lg" withBorder h={120}>
          <Text fz={20} mb={12}>
            Registered Users
          </Text>
          <Skeleton visible={isFetching} w="fit-content">
            <Text fz={28} pos="relative">
              {data?.data.data.count}
            </Text>
          </Skeleton>
        </Paper>
      </SimpleGrid>
    </Box>
  );
};
