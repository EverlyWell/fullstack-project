
import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../LoginForm';

test('renders correctly', () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
