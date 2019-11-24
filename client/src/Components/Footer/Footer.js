// @flow

import React, {Component} from 'react'
import './Footer.css'
import facebook_logo from "../../assets/images/icons/facebook.png";
import twitter_logo from "../../assets/images/icons/twitter.png";
import youtube_logo from "../../assets/images/icons/youtube.png";
import flickr_logo from "../../assets/images/icons/flickr.png";
import instagram_logo from "../../assets/images/icons/instagram.png";

type State = {}
type Props = {}

class Footer extends Component<Props, State> {
    render() {
        return (
            <div className={"container-fluid footer navbar-fixed-bottom mainFooter"} style={{background: "#00204A"}}>
                <div className={"row justify-content-center"}>
                    <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook_logo}
                                                                                                     alt="fbook"
                                                                                                     id="imgLogo"/></a>
                    <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter_logo}
                                                                                                    alt="twitter"
                                                                                                    id="imgLogo"/></a>
                    <a href="http://www.flickr.com" target="_blank" rel="noopener noreferrer"><img src={flickr_logo}
                                                                                                   alt="flickr"
                                                                                                   id="imgLogo"/></a>
                    <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram_logo}
                                                                                                      alt="insta"
                                                                                                      id="imgLogo"/></a>
                    <a href="http://www.youtube.com" target="_blank" rel="noopener noreferrer"><img src={youtube_logo}
                                                                                                    alt="youtube"
                                                                                                    id="imgLogo"/></a>
                </div>
                <div id={"info"}>
                    <h5>Kontakt: </h5>
                    <span><b>Tlf: </b>91782159 </span><br/>
                    <span><b>E-post: </b>redaksjonen@kalvskinnetNews.com </span>
                </div>
            </div>
        )

    }
}

export default Footer;