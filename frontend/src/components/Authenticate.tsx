import React, {Component} from 'react';

export default class Authenticate extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  getAuthenticationToken() {
    const { email, password } = this.state;
    let token = '';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ user: { email: email, password: password }})
    };

    fetch("/api/v1/login", requestOptions)
        .then(response => {
          let authorization = response.headers.get('Authorization');
          if (authorization) {
            token = authorization.split(' ')[1];
            this.props.setToken(token);
          }
          return response.json();
        })
        .then((result) => {
        }
      )
    ;
  }

  handleChange = (event: any) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.getAuthenticationToken();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email: <input name="email" type="email" onChange={this.handleChange} /></label>
        </div>
        <div>
          <label>Password: <input name="password" type="password" onChange={this.handleChange} /></label>
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    );
  }
}
