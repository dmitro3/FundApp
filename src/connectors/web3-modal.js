import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {setAddress, setChainId, setUser, setWeb3,} from "../store/actions";
import store from "../store";
import * as UAuthWeb3Modal from '@uauth/web3modal'
import UAuthSPA from '@uauth/js'

const rpcSupport = {
    137: 'https://rpc-mainnet.maticvigil.com/',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    56: 'https://bsc-dataseed.binance.org/',
    1666600000: 'https://api.harmony.one',
    1285: 'https://rpc.moonriver.moonbeam.network',
    336: 'https://rpc.shiden.astar.network:8545',
};

export const uauthOptions = {
    clientID: 'f0g/bSG6NwOVPgwcucYdziX9uH2tF86scTJkK++dyV4=',
    clientSecret: 'G3bXMk6KPEq+6mlJr4v/3gxwOvVkdkR1eAAAWvFXu08=',
    redirectUri: 'https://fundapp-denver.netlify.app/callback',
    scope: 'openid wallet email:optional',
}

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: rpcSupport,
        },
    },
    'custom-uauth': {
        display: UAuthWeb3Modal.display,
        connector: UAuthWeb3Modal.connector,
        package: UAuthSPA,
        options: uauthOptions,
    },
};

export const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
});

UAuthWeb3Modal.registerWeb3Modal(web3Modal)

export const disconnectWeb3Modal = async () => {
    web3Modal.clearCachedProvider();
    store.dispatch(setAddress(null));
    localStorage.removeItem('username');
    localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
};

export const connectWeb3Modal = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    let chainID = await web3.eth.net.getId();

    let accounts = await web3.eth.getAccounts();

    store.dispatch(setChainId(chainID));
    store.dispatch(setWeb3(web3));

    if (accounts.length > 0)
        store.dispatch(setAddress(accounts[0]));

    if (web3Modal.cachedProvider === "custom-uauth") {
        const {package: uauthPackage, options: uauthOptions} = providerOptions["custom-uauth"];
        await UAuthWeb3Modal.getUAuth(uauthPackage, uauthOptions).user()
            .then((user) => {
                store.dispatch(setUser(user));
            })
    }

    provider.on('connect', (info) => {
        console.log(info);
    });

    provider.on('disconnect', (error) => {
        console.log(error);
        store.dispatch(setAddress(null));
    });

    provider.on('accountsChanged', async (accounts) => {
        store.dispatch(setAddress(accounts[0]));
    });

    provider.on('chainChanged', async (chainID) => {
        chainID = parseInt(web3.utils.hexToNumber(chainID));
        store.dispatch(setChainId(chainID));
        store.dispatch(setWeb3(web3));
    });
};
