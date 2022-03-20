export const ABI = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "id", "type": "uint256"}, {
        "indexed": false,
        "internalType": "string",
        "name": "imageHash",
        "type": "string"
    }, {"indexed": false, "internalType": "string", "name": "title", "type": "string"}, {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
    }, {"indexed": false, "internalType": "uint256", "name": "collectedAmount", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "needToCollect",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "author", "type": "address"}],
    "name": "ProjectCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "id", "type": "uint256"}, {
        "indexed": false,
        "internalType": "string",
        "name": "imageHash",
        "type": "string"
    }, {"indexed": false, "internalType": "string", "name": "title", "type": "string"}, {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
    }, {"indexed": false, "internalType": "uint256", "name": "collectedAmount", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "needToCollect",
        "type": "uint256"
    }, {"indexed": false, "internalType": "address", "name": "author", "type": "address"}],
    "name": "ProjectTipped",
    "type": "event"
}, {
    "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
    "name": "donateToProject",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "projectCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "projects",
    "outputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {
        "internalType": "string",
        "name": "imageHash",
        "type": "string"
    }, {"internalType": "string", "name": "title", "type": "string"}, {
        "internalType": "string",
        "name": "description",
        "type": "string"
    }, {"internalType": "uint256", "name": "collectedAmount", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "needToCollect",
        "type": "uint256"
    }, {"internalType": "address", "name": "author", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_imageHash", "type": "string"}, {
        "internalType": "string",
        "name": "_title",
        "type": "string"
    }, {"internalType": "uint256", "name": "_needToCollect", "type": "uint256"}, {
        "internalType": "string",
        "name": "_description",
        "type": "string"
    }], "name": "uploadProject", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}]
