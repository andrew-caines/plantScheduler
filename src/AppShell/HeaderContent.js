import { Header, Text } from "@mantine/core";
export default function HeaderContent(props) {
    return (
        <Header height={60} padding="xs">
            <div className="App-header" style={{ width: '100%', height: '60px' }}>
                <Text size="lg" color="white">Plant Scheduler v1.0</Text>
            </div>
        </Header>
    )
}