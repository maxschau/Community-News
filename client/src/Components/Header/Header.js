// @flow

import React, {Component} from 'react';
import NavBar from "./NavBar/NavBar";
import './Header.css';

type State = {}
type Props = {}
class Header extends Component<State, Props> {
    render() {
        return(
            <div>
                <NavBar />
            </div>
        );
    }
}

export default Header;