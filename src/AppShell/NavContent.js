import { Button, Group, Navbar, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Bottle, CalendarEvent, CalendarPlus, CheckupList, ListDetails, Plant2, Plus, Replace, Tent, Message, Stack } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
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
                    <ListDetails />
                    <Button
                        component={Link}
                        to="/server-info"
                        variant="white"

                    >
                        Server Details
                    </Button>
                </Group>
                <Group>
                    <Message />
                    <Button
                        variant="white"
                        onClick={() => {
                            invoke('test_message')
                        }}
                    >
                        API message test
                    </Button>
                </Group>
                <Group>
                    <Message />
                    <Button
                        variant="white"
                        onClick={() => {
                            invoke('echo_message', { message: `From frontend @ ${new Date().toLocaleTimeString('en-us')}` });
                        }}
                    >
                        API with payload
                    </Button>
                </Group>
                <Group>
                    <Message />
                    <Button
                        variant="white"
                        onClick={async () => {
                            let server_message = await invoke('message_from_server');
                            notifications.showNotification({
                                title: `From Server`,
                                message: `${server_message}`,
                                autoClose: 5000
                            })
                        }}
                    >
                        From Server
                    </Button>
                </Group>
            </Navbar.Section>
        </Navbar>
    )
}