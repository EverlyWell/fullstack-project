import React from 'react';
import { shallow } from 'enzyme';

import Image from '../Image';

describe('Image', () => {
  let tree, props;

  const buildTree = () => {
    const props = {
        imageUrl: 'https://picsum.photos/200/300',
        title: 'photo',
        className: 'Image',
    };

    return shallow(<Image {...props} />);
  };

  it('matches the snapshot', () => {
    tree = buildTree();
    expect(tree).toMatchSnapshot();
  });
});
