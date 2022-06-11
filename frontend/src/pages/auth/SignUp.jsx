import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';
import jwt_decode from 'jwt-decode';

import { Web3Context } from "@store/providers/Web3Provider";
import { registerUser } from "@services/auth.service";
import { pubKeyShortAddress } from "@utils/format";
import { setCredential } from "@store/slices/auth.slice";

const SignUp = () => {
    const { account, connectWallet } = useContext(Web3Context);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleConnectWallet = async () => {
        const wallet_address = await connectWallet();

        try {
            const response = await registerUser({ email, username, password, wallet_address });
            const decoded = jwt_decode(response.token);
            enqueueSnackbar("Registered Successfully!", { variant: 'success' });

            localStorage.setItem("jwtToken", response.token);
            dispatch(setCredential(decoded));
            navigate("/");
        } catch (err) {
            if (err?.status == 409)
                enqueueSnackbar("Registered User!", { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        };
    }

    const validate = () => {
        if (!account && !email && !username) {
            enqueueSnackbar("Please enter any data!", { variant: 'error' });

            return false;
        } if (account) {
            return true;
        } else if (!account) {
            if (!email) {
                enqueueSnackbar("Please type your email!", { variant: 'error' });

                return false;
            } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
                enqueueSnackbar("Invalid email!", { variant: 'error' });

                return false;
            } else if (!username) {
                enqueueSnackbar("Please type your username!", { variant: 'error' });

                return false;
            } else if (!password) {
                enqueueSnackbar("Please type your password!", { variant: 'error' });

                return false;
            } else if (password !== repass) {
                enqueueSnackbar("Mismatched password!", { variant: 'error' });

                return false;
            }
        }
        
        return true;
    }

    const handleSignUp = async () => {
        if (!validate()) return;

        try {
            const response = await registerUser({ email, username, password, wallet_address: account });
            const decoded = jwt_decode(response.token);
            enqueueSnackbar("Registered Successfully!", { variant: 'success' });

            localStorage.setItem("jwtToken", response.token);
            dispatch(setCredential(decoded));
            navigate("/");
        } catch (err) {
            if (err?.status == 409)
                enqueueSnackbar("Registered User!", { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <div className="auth-form d-flex flex-column align-items-center">
                <button className="btn btn-warning text-white btn-lg cus-btn-warning w-100" onClick={ handleConnectWallet }>
                    {
                        account
                        ?
                            pubKeyShortAddress(account, 8)
                        :
                            <>
                                <AccountBalanceWalletIcon /> Register Wallet
                            </>
                    }
                </button>
                <input className="cus-input-outline-primary w-100 mt-4" placeholder="Email"
                        value={ email } onChange={ e => setEmail(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" placeholder="Username"
                        value={ username } onChange={ e => setUsername(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Password"
                        value={ password } onChange={ e => setPassword(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Confirm Password"
                        value={ repass } onChange={ e => setRepass(e.target.value) } />
                <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleSignUp }>Sign Up</button>
            </div>
        </section>
    );
}

export default SignUp;