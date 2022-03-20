import React from 'react';
import Home from "./components/home";
import {AppShell, Avatar, Badge, Container, Group, Header, MediaQuery, Tooltip, useMantineTheme} from "@mantine/core";
import ConnectWalletButton from "./components/connect-wallet-button";
import {useSelector} from "react-redux";


function App() {
    const theme = useMantineTheme();
    const {chainId, web3, user, walletAddress, shortAddress} = useSelector((state) => state);

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[1];

    return (
        <AppShell navbarOffsetBreakpoint="sm" fixed style={{background: secondaryColor}} header={
            <Header height={60} padding="md">
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Container style={{width: '100%'}}>
                        <Group position="apart">
                            {(user || shortAddress)
                                ? <MediaQuery smallerThan="sm" styles={{display: 'none'}}>
                                    <Tooltip label={walletAddress} position="bottom">
                                        <Badge> {user ? user.sub : shortAddress}</Badge>
                                    </Tooltip>
                                </MediaQuery>
                                : <Group></Group>
                            }
                            <Group>
                                <ConnectWalletButton/>
                                {shortAddress &&
                                    <Avatar/>
                                }
                            </Group>
                        </Group>
                    </Container>
                </div>
            </Header>
        }>
            <Container style={{maxWidth: '95%', minHeight: '90vh'}}>
                <Home/>
            </Container>
        </AppShell>
    );
}

export default App;
