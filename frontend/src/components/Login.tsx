import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {login} from "../services/auth.service";

interface ILoginProps {
  history: any;
}

type LoginForm = {
  email: string;
  password: string;
};

const Login = (props: ILoginProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    setMessage('');
    setLoading(true);

    try {
      const {email, password} = data;
      await login(email, password);
      setLoading(false);
      props.history.push("/cats");
      window.location.reload();
    } catch (e) {
      console.log(e);
      setMessage('Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            data-testid="login-image"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              data-testid="login-email"
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              data-testid="login-password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          <div className="form-group">
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <button
              data-testid="login-submit"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Login
            </button>
            <button
              data-testid="login-reset"
              type="button"
              onClick={() => reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
