import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
    let tree, props;

    const buildTree = (newProps = {}) => {
        return shallow(<App />);
    };

    test('renders successfully', () => {
        tree = buildTree();
        expect(tree).toMatchSnapshot();
    });
});
