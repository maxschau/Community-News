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
import KategoriService, {Kategori} from '../../../services/kategoriService';
import logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/logo.png";


type State = {
    kategorier: Kategori[],
    isOpen : boolean,
    navCollapsed : boolean,
    showNavbar : boolean
}

type Props = {}

class NavBar extends Component<State, Props> {
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
                    <a href="/#/home"><img src={logo} alt="logo.png" className="imgLogo"/></a>
                    <NavbarBrand href="/#/home"><h5 className="link">Kalvskinnet News</h5></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                                <NavItem><NavLink href="/#/home">
                                    <h5 className="link">Hjem</h5>
                                </NavLink></NavItem>
                                <NavItem><NavLink href="/#/reg">
                                    <h5 className="link">Registrer ny sak</h5>
                                </NavLink></NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle dark nav caret>
                                        <h5 className="link">Kategorier</h5>
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