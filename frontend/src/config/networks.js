export const BSC_NETWORK = {
    mainnet: {
        chainId: '0x38',
        chainName: 'BNB Smart Chain Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com']
    },
    testnet: {
        chainId: '0x61',
        chainName: 'BNB Smart Chain Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'tBNB',
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com/']
    }
}

export const CURRENT_NETWORK = BSC_NETWORK[process.env.REACT_APP_CURRENT_NETWORK];