
import React from 'react';
import CatCard from './CatCard';

export default {
  title: 'CatCard',
  component: CatCard,
  argTypes: {},
};

const Template = (args) => <CatCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
