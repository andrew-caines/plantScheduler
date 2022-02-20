import { ActionIcon, Button, Group, Navbar, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Activity, Bottle, CalendarEvent, CalendarPlus, CheckupList, Notification, Plant2, Plus, Replace, Tent, List, Stack } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

export default function NavContent(props) {
    const notifications = useNotifications();

    return (
        <Navbar {...props}>
            <Navbar.Section>
                <Text size="xs">Schedules</Text>
                <Group>
                    <CalendarEvent />
                    <Button component={Link} to="/schedules" variant="white">
                        List Schedules
                    </Button>
                </Group>
                <Group>
                    <CalendarPlus />
                    <Button component={Link} to="/new-schedule" color="green" variant="white">
                        New Schedule
                    </Button>
                </Group>

            </Navbar.Section>
            <Navbar.Section>
                <Text size="xs">Protocols</Text>
                <Group>
                    <Stack />
                    <Button component={Link} to="/protocols" variant="white">
                        List Protocols
                    </Button>
                </Group>
                <Group >
                    <Plus />
                    <Button component={Link} to="/new-protocol" variant='white'>
                        New Protocol
                    </Button>
                </Group>
            </Navbar.Section>
            <Navbar.Section>
                <Text size="xs">Data</Text>
                <Group >
                    <Plant2 />
                    <Button component={Link} to="/strains" variant='white'>
                        Strains
                    </Button>
                </Group>
                <Group >
                    <Bottle />
                    <Button component={Link} to="/nutrients" variant='white'>
                        Nutrients
                    </Button>
                </Group>

                <Group >
                    <Tent />
                    <Button component={Link} to="/tents" variant='white'>
                        Tents
                    </Button>
                </Group>
            </Navbar.Section>
            <Navbar.Section>
                <Text size="xs">Events & Methods</Text>
                <Group >
                    <Replace />
                    <Button component={Link} to="/events" variant='white'>
                        Events
                    </Button>
                </Group>
                <Group >
                    <CheckupList />
                    <Button component={Link} to="/methods" variant='white'>
                        Method
                    </Button>
                </Group>
            </Navbar.Section>
            <Navbar.Section>
                <Text size="xs">Testing</Text>
                <Group>
                    <Notification />
                    <Button
                        variant="white"
                        onClick={() => notifications.showNotification({
                            title: "Test Notification",
                            message: "This is a test notification!",
                            autoClose: 2000
                        })}>
                        Click Notification test
                    </Button>
                </Group>
            </Navbar.Section>
        </Navbar>
    )
}