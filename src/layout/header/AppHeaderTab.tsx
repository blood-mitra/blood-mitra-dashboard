import cx from "clsx";
import { useState } from "react";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import classes from "./AppHeader.module.css";
import { Logo } from "../../components/logo";
import { useNavigate } from "react-router-dom";

const user = {
  name: "Admin",
  image:
    "https://res.cloudinary.com/ottr-technology/image/upload/v1668651519/baccpacc/template-trips/cover-images/etvdmtratkmaywsijk9o.png",
};

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <Container m={0} maw={"100%"} className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
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
                  <Text fw={500} size="sm" lh={1} ml={3}>
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
                onClick={() => navigate("/login")}
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
      </Container>
    </div>
  );
};
