import { createContext, useState, useRef } from 'react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import TrustWalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { Stack, Typography, Backdrop, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider } from 'notistack';

import TrustWalletLogo from "@assets/images/logos/trust_wallet.png";
import { CURRENT_NETWORK } from "@config/networks";

const providerOptions = {
    binancechainwallet: {
        package: true,
    },
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID
        }
    },
    "custom-trustwallet": {
        display: {
            logo: TrustWalletLogo,
            name: "Trust Wallet",
            description: "Scan with Trust Wallet to connect"
        },
        package: TrustWalletConnect,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID,
        },
        connector: async (ProviderPackage, options) => {
            const connector = new ProviderPackage({
                bridge: "https://bridge.walletconnect.org",
                qrcodeModal: QRCodeModal
            });

            if (!connector.connected)
                connector.createSession();

            return connector;
        }
    }
};

const contextDefaultValues = {
    account: '',
    network: '',
    provider: null,
    isReady: false,
    web3: null
};

const web3Modal = new Web3Modal({
    providerOptions,
    disableInjectedProvider: false
});

export const Web3Context = createContext(contextDefaultValues);

export default function Web3Provider({ children }) {
    const [account, setAccount] = useState(contextDefaultValues.account);
    const [network, setNetwork] = useState(contextDefaultValues.network);
    const [provider, setProvider] = useState(contextDefaultValues.provider);
    const [isReady, setIsReady] = useState(contextDefaultValues.isReady);
    const [web3, setWeb3] = useState(contextDefaultValues.web3);
    const notistackRef = useRef();

    function initializeWeb3 () {
        setAccount(contextDefaultValues.account);
        setNetwork(contextDefaultValues.network);
        setProvider(contextDefaultValues.provider);
        setIsReady(contextDefaultValues.isReady);
        setWeb3(null);
    }

    async function connectWallet () {
        const connection = await web3Modal.connect();
        const currentWeb3 = new Web3(connection);
        const accounts = await currentWeb3.eth.getAccounts();
        const currentChainId = await currentWeb3.eth.getChainId();

        accounts && setAccount(accounts[0]);
        setNetwork(currentChainId);
        setProvider(connection);
        setWeb3(currentWeb3);
        setIsReady(true);

        if (connection) {
            connection.on("accountsChanged", async (accounts) => {
                setAccount(accounts[0]);
            });

            connection.on("chainChanged", (chainId) => {
                setNetwork(chainId);
            });
        }

        return accounts[0];
    }

    function disconnectWallet() {
        web3Modal.clearCachedProvider();
        initializeWeb3();
    }

    return (
        <Web3Context.Provider value={{
            account,
            network,
            provider,
            isReady,
            web3,
            connectWallet,
            disconnectWallet,
        }}>
            <SnackbarProvider ref={ notistackRef } maxSnack={3}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transitionDuration={{ enter: 225, exit: 197 }}
                                action={ key  => <IconButton onClick={ () => notistackRef.current.closeSnackbar(key) }><CloseIcon sx={{ color: '#fff' }} /></IconButton> }>
                {
                    network && network != CURRENT_NETWORK.chainId &&
                        <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={ true }>
                            <Stack sx={{ alignItems: 'center' }}>
                                <WarningAmberIcon color="warning" fontSize="large" />
                                <Typography variant="h5" sx={{ marginTop: 1 }}>Please switch to the correct network!</Typography>
                            </Stack>
                        </Backdrop>
                }
                { children }
            </SnackbarProvider>
        </Web3Context.Provider>
    );
}