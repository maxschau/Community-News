// @flow

import React, {Component} from 'react'
import {Row, Column} from '../widgets';
import ArticleService, {Article} from '../../services/articleService';
import KategoriService from '../../services/kategoriService';
import {toast} from 'react-toastify';

//Setting the types of the state
type State = {
    overskrift : string,
    ingress : string,
    innhold : string,
    kategori: number,
    bilde : string, 
    viktighet: number,
    tidspunkt : string, 
    forfatter : string,
    likes : number
}

type Props = {
    id : number
}

class EndreArtikkel extends Component<State, Props> {
    constructor(props) {
        super(props);

        this.state = {
            overskrift:"",
            ingress : "",
            innhold:"",
            kategori:"",
            bilde:"",
            viktighet:"",
            tidspunkt:"",
            forfatter : "",
            kategorier: []
        }
    }

    notifyChange: void = () => {
        toast("Endring av artikkel vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    }

    notifyDelete: void = () => toast("Sletting gikk bra", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});

    save() : void {
        let articleService = new ArticleService();
        let newArticle = new Article(this.state.overskrift, this.state.ingress, this.state.innhold, this.state.kategori, this.state.bilde, this.state.viktighet, this.state.forfatter);
        articleService.updateOneArticle(this.props.match.params.id, newArticle)
            .then(() => {
                this.notifyChange();
                window.location.hash = '/nyheter/' + this.props.match.params.id
            })
            .catch((error) => console.error(error))
    }

    delete() : void {
        let articleService = new ArticleService();
        articleService.deleteOneArticle(this.props.match.params.id)
            .then(() => {
                this.notifyDelete();
                window.location.hash = '/home';
            })
            .catch((error) => console.error(error))
    }

    handleChange : void = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return(
            <div>
                <form>
                    <div className="form-group">
                        <label>Overskrift: </label>
                        <input type="text" className="form-control"
                               id="fname" placeholder="Skriv inn overskrift"
                               value = {this.state.overskrift}
                               name="overskrift" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Ingress:</label>
                        <textarea  className="form-control" id="lname" value = {this.state.ingress} rows="2"
                                   placeholder="Skriv inn innholdet" name="ingress" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Innhold:</label>
                        <textarea  className="form-control" id="lname" value = {this.state.innhold} rows="3"
                               placeholder="Skriv inn innholdet" name="innhold" onChange={this.handleChange} required/>
                    </div>


                    <div className="form-group">
                        <label>Bilde:</label>
                        <input type="text" className="form-control"
                               id="fname" value = {this.state.bilde} placeholder="Skriv inn bilde-URL"
                               name="bilde" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Column>
                                <label>Kategori: </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <select className="btn btn-secondary" name="kategori" value= {this.state.kategori} onChange={this.handleChange}>
                                {this.state.kategorier.map((kategorier) => {
                                    return(
                                        <option value={kategorier.id} name = "kategori" selected={this.state.kategori === kategorier.id}>{kategorier.navn}</option>
                                    )
                                })}
                                </select>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>Viktighet </label>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <label>1<input type="radio" name="viktighet" value={1} checked= {this.state.viktighet == 1} onChange={this.handleChange}/></label>
                                <label>2<input type="radio" name="viktighet" value={2} checked= {this.state.viktighet == 2} onChange={this.handleChange}/></label>

                            </Column>
                        </Row>
                    </div>
                    <Row>
                        <Column>
                            <button type="button" className="btn btn-secondary" onClick={() => this.save()}>
                            Lagre
                            </button>
                        </Column>
                        <Column>
                            <button type="button" className="btn btn-danger" onClick={() => this.delete() }> Slett </button>
                        </Column>
                    </Row>
                </form>
            </div>
        );
    }



    componentDidMount() {
            let articleService = new ArticleService();
            let kategoriService = new KategoriService();

            kategoriService.getAll()
                .then((kategorier) => {
                    this.setState({
                        kategorier: kategorier.data
                    })
                })
                .catch((error) => {
                    console.error(error);
                })

            articleService.getOneArticle(this.props.match.params.id)
                .then((article) => {
                    this.setState({
                        overskrift: article.data[0].overskrift,
                        ingress: article.data[0].ingress,
                        innhold: article.data[0].innhold,
                        kategori: article.data[0].kategori,
                        bilde: article.data[0].bilde,
                        viktighet: article.data[0].viktighet,
                        tidspunkt: article.data[0].tidspunkt,
                        forfatter: article.data[0].forfatter
                    });
                    //window.scrollTo(0, document.body.scrollHeight)
                })
        
    }
}

export default EndreArtikkel;