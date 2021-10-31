import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signup } from "../services/auth.service";

interface IRegisterProps {
  history: any;
}

type RegisterForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
};

const Register = (props: IRegisterProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
      passwordConfirmation: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Password confirmation does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const onSubmit = async (data: RegisterForm) => {
    setMessage('');
    setLoading(true);

    try {
      const {email, password, passwordConfirmation} = data;
      await signup(email, password, passwordConfirmation);
      setLoading(false);
      props.history.push("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
      setMessage('Signup failed.');
      setLoading(false);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            data-testid="register-image"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              data-testid="register-email"
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              data-testid="register-password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              data-testid="register-password-confirmation"
              type="password"
              {...register('passwordConfirmation')}
              className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.passwordConfirmation?.message}</div>
          </div>

          <div className="form-group form-check">
            <input
              data-testid="register-accept-terms"
              type="checkbox"
              {...register('acceptTerms')}
              className={`form-check-input ${
                errors.acceptTerms ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the Terms
            </label>
            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
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
              data-testid="register-submit"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Register
            </button>
            <button
              data-testid="register-reset"
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
};

export default Register;
