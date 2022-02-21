import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { AppShell, Header } from '@mantine/core';
import NavContent from './AppShell/NavContent';
import HeaderContent from './AppShell/HeaderContent';
import LandingPage from './Pages/LandingPage';
import ListSchedules from './Pages/Schedules/ListSchedules';
import ListProtocols from './Pages/Protocol/ListProtocols';
import Strains from './Pages/Data/Strains';
import Nutrients from './Pages/Data/Nutrients';
import Tents from './Pages/Data/Tents';
import Events from './Pages/Events_Methods/Events';
import Methods from './Pages/Events_Methods/Methods';
import ServerInfo from './Pages/Testing/ServerInfo';
function App() {
  return (
    <AppShell
      padding="md"
      navbar={<NavContent width={{ base: 250 }} height={500} padding="xs" />}
      header={<HeaderContent />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedules" element={<ListSchedules />} />
        <Route path="/protocols" element={<ListProtocols />} />
        <Route path="/strains" element={<Strains />} />
        <Route path="/nutrients" element={<Nutrients />} />
        <Route path="/tents" element={<Tents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/server-info" element={<ServerInfo />} />
      </Routes>
    </AppShell>
  )
}

export default App
