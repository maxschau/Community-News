import React, {Component} from 'react'
import {Link} from "react-router-dom";
import './Footer.css'

class Footer extends Component {
    render() {
        return (
                <footer className="page-footer font-small mainFooter">
                    <div className="footer-copyright text-center py-3">© 2019 Max Schau:
                        <Link to="/home"><p>dagensavis.no/</p></Link>
                    </div>
                </footer>
        )
    }
}

export default Footer;