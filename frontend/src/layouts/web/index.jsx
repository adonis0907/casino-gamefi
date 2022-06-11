import Header from "./header";
import Footer from "./footer";

const WebLayout = (props) => {
  return (
    <>
      <Header />
      <div className="flames" />
      { props.children }
      <Footer />
    </>
  )
}

export default WebLayout;