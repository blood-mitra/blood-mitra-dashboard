import {
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Modal,
  Text,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";

import { IconChevronDown, IconLogout } from "@tabler/icons-react";

import cx from "clsx";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Logo } from "components/logo";

import { AuthContext } from "context";

import classes from "./AppHeader.module.css";

const user = {
  name: "Admin",
  image:
    "https://res.cloudinary.com/ottr-technology/image/upload/v1668651519/baccpacc/template-trips/cover-images/etvdmtratkmaywsijk9o.png",
};

export const Header = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  const { removeToken } = useContext(AuthContext);

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [opened, { toggle }] = useDisclosure(false);

  const [userMenuOpened, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  const navigate = useNavigate();

  const [showModal, { close: closeModal, open: openModal }] =
    useDisclosure(false);

  const handleLogout = () => {
    navigate("/");
    removeToken();
  };

  return (
    <div className={classes.header}>
      <Container m={0} maw={"100%"} className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Box onClick={() => navigate("/")}>
            <Logo />
          </Box>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={closeMenu}
            onOpen={openMenu}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={28}
                  />
                  <Text fw={600} size="sm" lh={1} ml={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={openModal}
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Modal
          title="Logout confirmation"
          size="lg"
          padding={"lg"}
          opened={showModal}
          onClose={closeModal}
          centered
        >
          <Text>Are you sure you want to logout?</Text>

          <Box mt="xl">
            <Group justify="flex-end">
              <Button variant="outline" onClick={closeModal}>
                <Text>Cancel</Text>
              </Button>

              <Button onClick={handleLogout}>Yes, Logout</Button>
            </Group>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};
