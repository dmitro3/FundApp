import React, {useState} from 'react';
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    Group,
    Image,
    LoadingOverlay,
    Modal,
    NumberInput,
    Spoiler,
    Text,
    Tooltip,
    TypographyStylesProvider
} from "@mantine/core";
import Web3 from "web3";
import {useSelector} from "react-redux";
import {CheckIcon, CubeIcon, LightningBoltIcon, PersonIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {ABI} from "../contracts/abi";
import {CONTRACT_ADDRESS, MATIC_RPC} from "../utils/web3-list";

function ProjectCard({project, loadBlockchainData}) {
    const {chainId, web3, user, walletAddress, shortAddress} = useSelector((state) => state);
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState(0.00001);
    const notifications = useNotifications();
    const [loading, setLoading] = useState(false)

    const checkStatus = project['collectedAmount'] >= project['needToCollect']

    const donateToProject = async () => {
        setLoading(true)
        try {
            let tipAmount = window.web3.utils.toWei(value.toString(), 'Ether')
            const web3 = new Web3(MATIC_RPC)
            const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
            const encodedDate = await myContract.methods.donateToProject(project['id']).encodeABI()

            const params = {
                from: walletAddress,
                to: CONTRACT_ADDRESS,
                value: tipAmount,
                data: encodedDate
            };
            await window.ethereum.enable();
            window.web3 = new Web3(window.ethereum);

            await window.web3.eth.sendTransaction(params)
                .then((sendHash) => {
                    console.log('txnHash is ' + sendHash);
                    setOpened(false)
                    setLoading(false)
                    loadBlockchainData()
                })
        } catch (e) {
            setLoading(false)
        }
    }

    const handlerOpenModal = () => {
        if (!walletAddress) {
            notifications.showNotification({
                title: 'Wallet not detected',
                message: 'Please connect Wallet!',
                color: 'red'
            })
        } else if(walletAddress && chainId !== 137) {
            notifications.showNotification({
                title: 'Wrong Network',
                message: 'Please connect to Polygon Network!',
                color: 'red'
            })
        } else {
            setOpened(true)
        }
    }

    return (
        <TypographyStylesProvider>
            <Card shadow="sm" padding="lg">
                <Card.Section>
                    <Image src={'https://ipfs.infura.io/ipfs/' + project[1]} height={200} alt="Norway"/>
                </Card.Section>

                <Group position="apart" style={{marginBottom: 5, marginTop: '13px'}}>
                    <Group>
                        <Tooltip label={checkStatus ? 'Completed' : 'In Progress'} position="bottom" placement="center"
                                 gutter={10}>
                            <ActionIcon size={24} mr={5} color="green" radius="xl" variant="filled">
                                {checkStatus
                                    ? <CheckIcon size={24} mr={5}/>
                                    : <LightningBoltIcon size={24} mr={5}/>
                                }
                            </ActionIcon>
                        </Tooltip>
                        <Badge size="lg" color="blue" variant="light" leftSection={<CubeIcon/>}>
                            Collected: {project['collectedAmount'] / (10 ** 18)} / {(project['needToCollect'] / (10 ** 18)) + ' MATIC'}
                        </Badge>
                    </Group>
                    <Tooltip label={project['author']} position="bottom" placement="center" gutter={10}>
                        <Badge size="lg" color="teal" leftSection={<PersonIcon/>}>
                            {project['author'].substr(0, 9) + "..." + project['author'].substr(project['author'].length - 9)}
                        </Badge>
                    </Tooltip>
                </Group>
                <Group position={'center'}>
                    <Text size="xl" weight={700}>{project['title']}</Text>
                </Group>
                <Box position="apart" style={{marginBottom: 5}}>
                    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                        <TypographyStylesProvider>
                            <Text weight={500}>{project['description']}</Text>
                        </TypographyStylesProvider>
                    </Spoiler>
                </Box>

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    hideCloseButton
                    centered
                >
                    <LoadingOverlay visible={loading}/>
                    <NumberInput
                        defaultValue={0.00001}
                        placeholder="Enter donate value"
                        label="Donate amount"
                        required
                        mb={'15px'}
                        precision={5}
                        min={0.00001}
                        value={value}
                        decimalSeparator=","
                        onChange={(val) => setValue(val)}
                    />
                    <Button fullWidth onClick={donateToProject}>Send</Button>
                </Modal>
                <Button onClick={handlerOpenModal} variant="light" color="blue" fullWidth style={{marginTop: 14}}>
                    Donate
                </Button>
            </Card>
        </TypographyStylesProvider>
    );
}

export default ProjectCard;
