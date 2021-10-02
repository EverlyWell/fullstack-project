
import React from 'react';
import renderer from 'react-test-renderer';
import CatCard from '../CatCard';

test('renders correctly', () => {
    const tree = renderer.create(<CatCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
