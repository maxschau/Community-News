import React from 'react';
import ReactDOM from 'react-dom';


import renderer from 'react-test-renderer';

import Article from '../Article/Article';
import CategoryView from '../CategoryView/CategoryView';
import ChangeArticle from '../ChangeArticle/ChangeArticle';
import CommentSingle from '../Comment/CommentSingle';
import CommentView from '../Comment/CommentView';
import CreateArticle from '../CreateArticle/CreateArticle';
import Footer from '../Footer/Footer';
import FrontPage from '../FrontPage/FrontPage';
import MainArticle from '../FrontPage/MainArticle';
import OtherArticle from '../FrontPage/OtherArticle';
import NavBar from '../Header/NavBar/NavBar';
import Header from '../Header/Header';
import LiveFeedElement from '../LiveFeed/LiveFeedElement';
import LiveFeed from '../LiveFeed/LiveFeed';


describe('Article renders correctly', () => {
    test('snapshot renders', () => {
        const props = {
            match: { params: {id: 1}}
        }
        const params = {id : 1};
        const component = renderer.create(<Article {...props}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Footer renders correctly', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/*

test('Article component renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: {params : {id: 1}}
    };
    const params = {id : 1};
    ReactDOM.render(<Article {...props} />, div);
});


test("CategoryView component renders without crashing", () => {
    const div = document.createElement('div');
    const props = {
        match: {params : {id: 1}}
    };
    const params = {id : 1};
    ReactDOM.render(<CategoryView {...props} />, div);
});

test("ChangeArticle component renders without crashing", () => {
    const div = document.createElement('div');
    const props = {
        match: {params : {id: 1}}
    };
    const params = {id : 1};
    ReactDOM.render(<ChangeArticle {...props} />, div);
});

test("CommentSingle component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<CommentSingle name="Test" comment="test test test"/>, div);
});

test("CommentView component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<CommentView id={1} />, div);
});

test("CreateArticle component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateArticle />, div);
});

test("Footer component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer/>, div);
});

test("FrontPage component renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<FrontPage/>, div);
});
*/







