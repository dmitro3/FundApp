import Web3 from "web3";
export const web3Default = {
    56: {
        web3Default: new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')),
        name: 'BSC Mainnet',
        explorer: 'https://bscscan.com/',
    },
    //BSC Testnet
    97: {
        web3Default: new Web3(
            new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s3.binance.org:8545/')
        ),
        name: 'BSC Testnet',
        explorer: 'https://testnet.bscscan.com/',
    },
    //Polygon Mainnet
    137: {
        web3Default: new Web3(
            new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com')
        ),
        name: 'Polygon Mainnet',
        explorer: 'https://polygonscan.com/',
    },
};

export const MATIC_RPC = 'https://poly-mainnet.gateway.pokt.network/v1/lb/6234c7bbe7d08b0039e82398'

export const CONTRACT_ADDRESS = '0xa6df58e1bff0c844e7fe08dbef5381443158011f'

export const defaultChainId = 137;

export const networkDefault = (() => {
    const savedChainId = Number.parseInt(localStorage.getItem('chainId'));
    return savedChainId > 0 && web3Default[savedChainId] ? savedChainId : defaultChainId;
})();

export const web3List = (_chainId) => {
    return web3Default[_chainId];
};
