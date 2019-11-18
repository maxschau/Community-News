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
import CategoryService, {Category} from '../../../services/CategoryService';
import logo from "C:/Programmering/NTNU/Systemutvikling 2/miniprosjekt/client/src/assets/images/logo.png";


type State = {
    categories: Category[],
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
            categories: [],
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
                                <NavItem><NavLink href="/#/createArticle">
                                    <h5 className="link">Registrer ny sak</h5>
                                </NavLink></NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle dark nav caret>
                                        <h5 className="link">Kategorier</h5>
                                    </DropdownToggle>
                                    <DropdownMenu right dark style={{backgroundColor: '#1F2833'}}>
                                        {this.state.categories.map((categories) => {
                                            return(
                                                <Link key={categories.id} to={"/categories/" + categories.id}><DropdownItem className="nav-link kategori" href="#"> {categories.name} </DropdownItem></Link>
                                            )
                                        })}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )

        
    }

    componentDidMount() {
        let categoryService = new CategoryService();
        categoryService.getAll()
            .then((categories) => {
                this.setState({
                    categories: categories.data
                })
            })
            .catch((error) => console.error(error))
    }
}

export default NavBar;