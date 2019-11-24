import React from 'react';
import ReactDOM from 'react-dom';


import ShallowRenderer from 'react-test-renderer/shallow';

import Article from "../Article/Article";
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

const renderer = new ShallowRenderer();

describe("article renders correctly", () => {
    it('article renders without crashing', () => {
        const props = {
            match: { params: {id: 1}}
        };
        renderer.render(<Article {...props} />);
    });
});

describe("categoryview renders correctly", () => {
    it('categoryview renders without crashing', () => {
        const props = {
            match: { params: {id: 1}}
        };
        renderer.render(<CategoryView {...props} />);
    });
});

describe("ChangeArticle renders correctly", () => {
    it('changearticle renders without crashing', () => {
        const props = {
            match: { params: {id: 1}}
        };
        renderer.render(<ChangeArticle {...props} />);
    });
});

describe("commentsingle renders correctly", () => {
    it('commentsingle renders without crashing', () => {
        renderer.render(<CommentSingle name="Max" comment="Meget bra" time={"2019-11-23 15:27:42"}/>);
    });
});

describe("commentview renders correctly", () => {
    it('commentview renders without crashing', () => {
        const props = {
            match: { params: {id: 1}}
        };
        renderer.render(<CommentView {...props} />);
    });
});

describe("createarticle renders correctly", () => {
    it('createarticle renders without crashing', () => {
        renderer.render(<CreateArticle />);
    });
});

describe("footer renders correctly", () => {
    it('footer renders without crashing', () => {
        renderer.render(<Footer />);
    });
});

describe("createarticle renders correctly", () => {
    it('createarticle renders without crashing', () => {
        renderer.render(<FrontPage />);
    });
});

describe("mainarticle renders correctly", () => {
    it('mainarticle renders without crashing', () => {
        renderer.render(<MainArticle show = {true} id={1} headline="test test" image="test.no" />);
    });
});

describe("otherarticle renders correctly", () => {
    it('otherarticle renders without crashing', () => {
        renderer.render(<OtherArticle id={1} headline="test test" image="test.no" />);
    });
});

describe("header renders correctly", () => {
    it('header renders without crashing', () => {
        renderer.render(<Header/>);
    });
});

describe("navbar renders correctly", () => {
    it('navbar renders without crashing', () => {
        renderer.render(<NavBar/>);
    });
});

describe("livefeed renders correctly", () => {
    it('livefeed renders without crashing', () => {
        renderer.render(<LiveFeed/>);
    });
});

describe("livefeedelement renders correctly", () => {
    it('livefeedelement renders without crashing', () => {
        renderer.render(<LiveFeedElement id={1} headline = {"tester igjen"} time={"12.12.2019 14:56"} />);
    });
});








