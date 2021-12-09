
import React from 'react';
import { shallow } from 'enzyme';

import ImagesList from '../ImagesList';

describe('ImagesList', () => {
  let tree, props;

  const buildTree = () => {
      const props = {
          images: [
              {
                  imageUrl: 'https://picsum.photos/300/200',
                  title: 'photo 1',
                  id: '189094',
              },
              {
                  imageUrl: 'https://picsum.photos/200/300',
                  title: 'photo 2',
                  id: '189093',
              },
          ],
          loading: false,
      }

      return shallow(<ImagesList {...props} />);
  };

    it('matches the snapshot', () => {
        tree = buildTree();
        expect(tree).toMatchSnapshot();
    });
});
