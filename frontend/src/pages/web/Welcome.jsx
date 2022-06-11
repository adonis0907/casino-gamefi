import { useSelector } from 'react-redux';

const Welcome = () => {
    const auth = useSelector(state => state.auth);

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <h1>Welcome to Here!</h1>
        </section>
    )
}

export default Welcome;