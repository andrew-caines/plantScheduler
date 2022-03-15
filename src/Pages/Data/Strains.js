import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Loader } from '@mantine/core';

export default function Strains(props) {
    const [users, setUsers] = useState({});
    useEffect(() => {
        //When page is loaded, reach out to back end, and get the details!
        async function getStrains() {
            let result = await invoke('get_all_strains');

            console.log(result);
            setUsers(JSON.parse(result));
        }

        getStrains();
    }, []);
    if (users.users) {
        return (
            <>
                <p>Users</p>
                <ul>
                    {users.users.map(row => {
                        return <li>{row.user_id} {row.first_name} {row.last_name}</li>
                    })}
                </ul>
            </>
        )
    } else {
        return  <Loader />;
    }
}