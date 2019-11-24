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
import CategoryService, {Category} from '../../../services/CategoryService';
import logo from "../../../assets/images/logo.png";


type State = {
    categories: Category[],
    isOpen : boolean,
    navCollapsed : boolean,
    showNavbar : boolean
}

type Props = {}

class NavBar extends Component<Props, State> {

    constructor(props : any) {
        super(props);
        this.state = {
            categories: [],
            isOpen: false,
            navCollapsed: true,
            showNavbar: false
        };
        const self : any = this;
        self.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return(
            <div>
                <Navbar style={{backgroundColor: '#00204A'}} dark expand="md">
                    <a href="/#/home"><img src={logo} alt="logo.png" className="imgLogo"/></a>
                    <NavbarBrand href="/#/home"><h5>Kalvskinnet News</h5></NavbarBrand>
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
                                    <DropdownToggle nav caret>
                                        <h5 className="link">Kategorier</h5>
                                    </DropdownToggle>
                                    <DropdownMenu right style={{backgroundColor: '#00204A'}}>
                                        {this.state.categories.map((categories) => {
                                            return(
                                                <DropdownItem key={categories.id} className="nav-link kategori" onClick={() => window.location.hash="#/categories/" + categories.id}> {categories.name} </DropdownItem>
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
                    categories: categories
                })
            })
            .catch((error) => console.error(error))
    }
}

export default NavBar;