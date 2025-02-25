import Logo from '@/components/logo/logo';
import { useAppDispatch } from '@/hooks';
import { AppRoutes } from '@/libs/const';
import { login } from '@/thunk/authorisation';
import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const loginData = {email: emailRef.current.value, password: passwordRef.current.value};
      dispatch(login(loginData))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.Main);
          }
        });
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" method="get" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden"></label>
									E-mail
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden"></label>
									Password
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?!.*^\s+$).+$'
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
								Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
