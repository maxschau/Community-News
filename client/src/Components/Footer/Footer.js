// @flow

import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {Row, Column} from '../widgets.js'
import './Footer.css'
import facebook_logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/icons/facebook.png";
import twitter_logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/icons/twitter.png";
import youtube_logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/icons/youtube.png";
import flickr_logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/icons/flickr.png";
import instagram_logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/icons/instagram.png";



class Footer extends Component {
    render() {
        return(
            <div className="mainFooter row justify-content-center">
                <div className="mainFooter row justify-content-center">
                    <div id="col">
                        <img src={facebook_logo} alt="fbook" id="imgLogo" />
                        <img src={twitter_logo} alt="twitter" id="imgLogo" />
                        <img src={flickr_logo} alt="flickr" id="imgLogo" />
                        <img src={instagram_logo} alt="insta" id="imgLogo" />
                        <img src={youtube_logo} alt="youtube" id="imgLogo" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div id="col">
                        <h5>Kontakt: </h5>
                        <span><b>Tlf: </b>91782159 </span><br/>
                        <span><b>E-post: </b>redaksjonen@kalvskinnetNews.com </span>

                    </div>
                </div>
            </div>
        )
        
    }
}

export default Footer;