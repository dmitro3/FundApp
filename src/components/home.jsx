import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {setChainId, setWeb3} from '../store/actions';
import store from '../store';
import {CONTRACT_ADDRESS, MATIC_RPC, networkDefault, web3List} from '../utils/web3-list';
import {Box, Button, Container, Group, Modal, SimpleGrid} from "@mantine/core";
import ProjectCard from "./project-card";
import {AddPostForm} from "./add-post-form";
import Web3 from "web3";
import {PlusIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {ABI} from "../contracts/abi";

const Home = () => {
    const {chainId, web3, walletAddress, shortAddress} = useSelector((state) => state);
    const [opened, setOpened] = useState(false);
    const [project, setProjects] = useState([])
    const notifications = useNotifications();

    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
    }, [])

    useEffect(() => {
        const setWeb3Default = async () => {
            await store.dispatch(setWeb3(web3List(networkDefault).web3Default));
            await store.dispatch(setChainId(networkDefault));
        };
        if (!web3 || !chainId) {
            setWeb3Default();
        }
    }, [web3, chainId]);

    useEffect(() => {
        if (walletAddress && chainId !== 137) {
            notifications.showNotification({
                title: 'Wrong Network',
                message: 'Please connect to Polygon Network!',
                color: 'red'
            })
        }
    }, [walletAddress]);

    useEffect(() => {
        if (walletAddress && chainId !== 137) {
            notifications.showNotification({
                title: 'Wrong Network',
                message: 'Please connect to Polygon Network!',
                color: 'red'
            })
        }
    }, [chainId]);

    const loadBlockchainData = async () => {
        const web3 = new Web3(MATIC_RPC)
        const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
        const projectCount = await myContract.methods.projectCount().call()
        setProjects([])
        for (var i = 1; i <= projectCount; i++) {
            const project = await myContract.methods.projects(i).call()
            setProjects(projects => [...projects, project])
        }
    }

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
    }

    const handlerCloseModalForCreate = () => {
        setOpened(false)
        loadBlockchainData()
    }

    const handlerOpenCreateModal = () => {
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
        <Container>
            <Modal
                centered
                hideCloseButton
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <AddPostForm handlerCloseModal={handlerCloseModalForCreate}/>
            </Modal>
            {shortAddress &&
                <Group position="right" mb={'xl'}>
                    <Button variant="light" onClick={handlerOpenCreateModal} leftIcon={<PlusIcon/>}>
                        Add new project
                    </Button>
                </Group>
            }
            <SimpleGrid>
                {project.map((item, index) =>
                    <Box key={item + '' + index}>
                        <ProjectCard loadBlockchainData={loadBlockchainData} project={item}/>
                    </Box>
                )}
            </SimpleGrid>
        </Container>
    )
}

export default Home
