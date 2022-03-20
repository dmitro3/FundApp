import React, {useState} from 'react';
import {useForm} from '@mantine/hooks';
import {Button, Group, Image, LoadingOverlay, NumberInput, Paper, Space, Textarea, TextInput,} from '@mantine/core';
import DropzoneArea from "./dropzone-area";
import Web3 from 'web3';
import {create} from 'ipfs-http-client'
import {useSelector} from "react-redux";
import {CONTRACT_ADDRESS, MATIC_RPC} from "../utils/web3-list";
import {ABI} from "../contracts/abi";

const ipfs = create({host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

export function AddPostForm({handlerCloseModal}) {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [buffer, setBuffer] = useState(null)
    const {chainId, web3, user, walletAddress, shortAddress} = useSelector((state) => state);

    const createProject = async () => {
        console.log("Submitting file to ipfs...")

        try {
            const result = await ipfs.add(buffer)
            setLoading(true)
            let needToCollect = window.web3.utils.toWei(form.values.needToCollect.toString(), 'Ether')

            const web3 = new Web3(MATIC_RPC)
            const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
            const encodedDate = await myContract.methods
                .uploadProject(result.path, form.values.title, needToCollect, form.values.description)
                .encodeABI()

            const params = {
                from: walletAddress,
                to: CONTRACT_ADDRESS,
                data: encodedDate,
            };

            await window.ethereum.enable();
            window.web3 = new Web3(window.ethereum);
            let sendHash = null;

            sendHash = await window.web3.eth.sendTransaction(params).then(() => {
                console.log('txnHash is ' + sendHash);
                handlerCloseModal()
            })

        } catch (e) {
            setLoading(false)
        }
    }

    const form = useForm({
        initialValues: {
            description: '',
            title: '',
            needToCollect: 0
        },
        validationRules: {
            description: (value) => value.trim().length >= 2,
            title: (value) => value.trim().length >= 2,
        },
        errorMessages: {
            description: 'Description should contain minimum 2 character.',
            title: 'Title should contain minimum 2 character.',
        },
    });

    const handleSubmit = () => {
        createProject()
    };

    return (
        <Paper
            padding={'lg'}
            sx={(theme) => ({
                position: 'relative',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            })}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <LoadingOverlay visible={loading}/>
                <TextInput
                    mt="md"
                    required
                    placeholder="Title"
                    label="Title"
                    {...form.getInputProps('title')}
                />
                <Textarea
                    mt="md"
                    placeholder="Description"
                    label="Description"
                    autosize
                    minRows={2}
                    maxRows={4}
                    {...form.getInputProps('description')}
                />
                <NumberInput
                    mt="md"
                    defaultValue={0.00001}
                    placeholder="NeedToCollect"
                    label="NeedToCollect"
                    required
                    decimalSeparator=","
                    min={0.00001}
                    precision={5}
                    {...form.getInputProps('needToCollect')}
                />
                <Space h={'lg'}/>
                <DropzoneArea file={file} setFile={setFile} buffer={buffer} setBuffer={setBuffer}/>
                <Space h={'lg'}/>
                {file &&
                    <Image radius="md"
                           height={150}
                           alt={`file preview`}
                           src={URL.createObjectURL(file)}
                    />
                }
                <Space h={'lg'}/>
                <Group position="center" mt="xl">
                    <Button color="blue" type="submit">
                        Save
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
