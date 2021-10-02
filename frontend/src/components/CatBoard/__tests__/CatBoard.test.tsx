
import React from 'react';
import renderer from 'react-test-renderer';
import CatBoard from '../CatBoard';

test('renders correctly', () => {
    const tree = renderer.create(<CatBoard />).toJSON();
    expect(tree).toMatchSnapshot();
});
