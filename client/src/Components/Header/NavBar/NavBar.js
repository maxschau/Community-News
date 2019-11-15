// @flow
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import React, {Component} from 'react';
import './navbar.css';
import {Link} from "react-router-dom";
import {Row, Column} from '../../widgets.js';
import KategoriService, {Kategori} from '../../../services/kategoriService';


type State = {
    kategorier: Kategori[],
    isOpen : boolean,
    navCollapsed : boolean,
    showNavbar : boolean
}

class NavBar extends Component<State> {
    //ToDo:

    constructor(props) {
        super(props);
        this.state = {
            kategorier: [],
            isOpen: false,
            navCollapsed: true,
            showNavbar: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        //const { navCollapsed } = this.state

        return(
            <div>
                <Navbar style={{backgroundColor: '#1F2833'}} dark expand="md">
                    <NavbarBrand href="/#/home"><p className="link">myNews</p></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                                <Link to="/home"><NavItem>
                                    <p className="link">Hjem</p>
                                </NavItem></Link>
                                <Link to="/reg"><NavItem>
                                    <p className="link">Registrer ny sak</p>
                                </NavItem></Link>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle dark nav caret>
                                        <p className="link">Kategorier</p>
                                    </DropdownToggle>
                                    <DropdownMenu right dark style={{backgroundColor: '#1F2833'}}>
                                        {this.state.kategorier.map((kategorier) => {
                                            return(
                                                <Link key={kategorier.id} to={"/kategorier/" + kategorier.id}><DropdownItem className="nav-link kategori" href="#"> {kategorier.navn} </DropdownItem></Link>
                                            )
                                        })}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )

        /*
        return (

            <nav className="navbar navbar-expand-md bg-dark navbar-dark-color navigationMain" >
                <Link to="/home"><p className="navbar-brand link">Hjem</p></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>

                <div className="collapse navbar-collapse navigationMain" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#"></a>
                        </li>
                        <li className="nav-item">
                            <Link to="/reg"><p className="navbar-brand link"> Registrer en ny sak </p></Link>
                        </li>
                        {this.state.kategorier.map((kategorier) => {
                            return (
                                <li className="nav-item" key={kategorier.id}><Link key={kategorier.id}
                                                                                   to={"/kategorier/" + kategorier.id}>
                                    <p className="navbar-brand link"> {kategorier.navn} </p></Link></li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        );
        /*
        return(
            <nav className="navbar navbar-expand-lg navbar-dark-color">
                <Link to="/home"><p className="nav-link link"> hjem </p></Link>
                <Link to="/reg"><p className="nav-link link"> Registrer en ny sak </p> </Link>

                {this.state.kategorier.map((kategorier) => {
                    return(
                       <Link key={kategorier.id} to={"/kategorier/" + kategorier.id}><p className="nav-link link" href="#"> {kategorier.navn} </p></Link>
                    )
                    })}
            </nav>
        );
        */
    }

    componentDidMount() {
        let kategoriService = new KategoriService();
        kategoriService.getAll()
            .then((kategorier) => {
                this.setState({
                    kategorier: kategorier.data
                })
            })
            .catch((error) => console.error(error))
    }
}

export default NavBar;