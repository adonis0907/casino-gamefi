const Footer = () => {
    return (
        <section className="footer container-fluid">
            <div className="container">
                <div className="d-flex align-items-center justify-content-center subscribe-block flex-wrap">
                    <div className="d-flex align-items-center mb-1">
                        <i className="fas fa-edit edit-icon"></i>
                        <h4 className="text-uppercase m-0 mx-3">
                            SUBSCRIBE TO OUR MAILING LIST
                        </h4>
                    </div>
                    <div className="send-email-box d-flex mb-1 SubscribeBtn2Box">
                        <input type="text" className="w-100" placeholder="Enter your email" id="SubscribeBtn2Text" />
                        <button className="btn send-email-btn" id="SubscribeBtn2">
                            Subscribe
                        </button>
                    </div>
                    <br />
                    <div id='SubscribeBtn2Msg' style={{ color: '#FFF', display: 'block', width: '100%' , textAlign: 'right', paddingRight: '15%' }}></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center flex-wrap copyright-block py-5">
                    <p className="mb-1">
                    @ Copyright 2022. All rights reserved by <a href ="#">Alexis Colin</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Footer;