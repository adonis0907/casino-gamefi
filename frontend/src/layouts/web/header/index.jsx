import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { destoryCredential } from "@store/slices/auth.slice";

const Header = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(destoryCredential());
    }

    return (
        <section className="header bg-7">
            <div className="m2-mx-width mx-auto d-flex align-items-center justify-content-end">
                {
                    (auth.username || auth.wallet_address || auth.email)
                        ?
                            <button className="btn btn-primary cus-btn-primary btn-sm me-2" onClick={ handleLogout }>
                                <span>Sign Out</span>
                            </button>
                        :
                            <Link className="btn btn-primary cus-btn-primary btn-sm me-2" to="/login">
                                <span>Sign In</span>
                            </Link>
                }
            </div>
        </section>
    )
}

export default Header;