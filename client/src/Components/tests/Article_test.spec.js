import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Article from "../Article/Article";

Enzyme.configure({ adapter: new Adapter() });