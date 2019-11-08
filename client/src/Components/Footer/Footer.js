import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {Row, Column} from '../widgets.js'
import './Footer.css'
import {faFacebookF, faTwitter}  from "@fortawesome/free-brands-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends Component {
    render() {
        return (
            <footer className="mainFooter">
                <Row>
                    <Column> 
                        <FontAwesomeIcon icon={faFacebookF} size="3x" />
                        <FontAwesomeIcon icon={faTwitter} size="3x" />
                        <FontAwesomeIcon icon={faTwitter} size="3x" />
                    </Column>

                </Row>
            </footer>
        )
    }
}

export default Footer;