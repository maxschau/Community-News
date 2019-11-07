import React, {Component} from 'react';
import './navbar.css';
import {Link} from "react-router-dom";
import KategoriService from '../../../services/kategoriService';


class NavBar extends Component {
    //ToDo:

    constructor(props) {
        super(props);
        this.state = {
            kategorier : []
        }
    }
    render() {
        //Collapse SHIT???
        //ToDO:
        //Av en eller annen grunn blir toogle merket ikke synlig og viser ikke menyvalget

        return(
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark-color navigationMain">
        <Link to="/home"><p className="navbar-brand link">Hjem</p></Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon navbar-dark"></span>
        </button>

        <div className="collapse navbar-collapse navigationMain" id="collapsibleNavbar">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" href="#"></a>
            </li>
            <li className="nav-item">
                <Link to="/reg"><p className="navbar-brand link"> Registrer en ny sak </p> </Link>
            </li>
                {this.state.kategorier.map((kategorier) => {
                return(
                    <li className="nav-item" key={kategorier.id}><Link key={kategorier.id} to={"/kategorier/" + kategorier.id}><p className="navbar-brand link"> {kategorier.navn} </p></Link></li>
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