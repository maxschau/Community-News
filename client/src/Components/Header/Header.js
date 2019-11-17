// @flow

import React, {Component} from 'react';
import NavBar from "./NavBar/NavBar";
import './Header.css';

class Header extends Component<> {
    render() {
        return(
            <div>
                <NavBar />
            </div>
        );
    }
}

export default Header;