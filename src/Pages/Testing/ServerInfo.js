import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Accordion, List, Loader, RingProgress, Text } from '@mantine/core';

export default function ServerInfo(props) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        //When page is loaded, reach out to back end, and get the details!
        async function getDetails() {
            let result = await invoke('get_server_details');
            console.log(result);
            setDetails(JSON.parse(result));
        }

        getDetails();
    }, []);

    if (details) {
        const mem_total = Math.floor(details.mem_used / details.mem_total * 100);
        return (
            <Accordion>
                <Accordion.Item label="System Info">
                    <p>Logged In User: {details.name}</p><br />
                    <p>Host name: {details.system_hostname}</p><br />
                    <p>CPU Count {details.cpu_count}</p><br />
                    <p>OS and Build Ver {details.os} - {details.kernel_ver}</p><br />
                </Accordion.Item>
                <Accordion.Item label="Network Info">
                    <List>
                        {details.network.map(nic => {
                            console.log(nic);
                            return (
                                <List.Item>
                                    Name: {nic.name} Sent:{nic.sent}  Received: {nic.rec}
                                </List.Item>
                            )
                        })}
                    </List>
                </Accordion.Item>
                <Accordion.Item label="Memory Info">
                    <RingProgress
                        label={<Text size="xs" align="center">Memory Usage {mem_total} %</Text>}
                        sections={[
                            { value: 100, color: 'green' },
                            { value: mem_total, color: 'pink' }
                        ]}
                    />
                </Accordion.Item>
            </Accordion>
        )
    } else {
        return (
            <Loader />
        )
    }

}