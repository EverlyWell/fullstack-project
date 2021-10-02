
import React from 'react';
import LoginForm from './LoginForm';

export default {
  title: 'LoginForm',
  component: LoginForm,
  argTypes: {},
};

const Template = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
