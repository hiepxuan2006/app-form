/* eslint-disable jsx-a11y/anchor-has-content */
import {
    faEye,
    faEyeSlash,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { useState } from 'react';
import { DataContext } from '~/Component/DataProvider';
import { TOKEN_NAME } from '~/utils/Contant';
import * as httpRequest from '~/utils/httpRequest';
import Validator from '~/utils/validate';
import style from './Login.module.scss';
const cx = classNames.bind(style);
function Login({ setShowRegister }) {
    const [showPass, setShowPass] = useState(false);
    const { setShowAcount } = useContext(DataContext);
    const [valueForm, setValueForm] = useState({ email: '', password: '' });
    const { email, password } = valueForm;
    const [error, sertError] = useState({});
    const [loading, setLoading] = useState(false);
    const handleInput = (e) => {
        e.preventDefault();
        setValueForm({ ...valueForm, [e.target.name]: e.target.value });
    };
    // const requiredWith = (value, field, state) =>
    //   (!state[field] && !value) || !!value;
    const rules = [
        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'The password field is required.',
        },
        {
            field: 'password',
            method: 'isLength',
            args: [{ min: 6 }],
            validWhen: true,
            message: 'The password must be at least 6 characters.',
        },
        {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'The email field is required.',
        },
        {
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'The email must be a valid email address.',
        },
    ];

    const validator = new Validator(rules);
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resultError = validator.validate(valueForm);
        sertError(resultError);
        if (
            resultError.email === undefined &&
            resultError.password === undefined
        ) {
            const result = await httpRequest.post('acount/login', valueForm);
            localStorage.setItem(TOKEN_NAME, result.token);
            // setCookie('token', result.token, 3);
            setValueForm({ email: '', password: '' });
            setLoading(false);
            setShowAcount(false);
        } else {
            setLoading(false);
            return;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-left')}>
                {/* <div className={cx("back")}>
          <FontAwesomeIcon
            icon={faCircleLeft}
          />
        </div> */}
                <div className={cx('header')}>
                    <h2>????ng nh???p</h2>
                </div>
                <div className={cx('title')}>
                    <h3>????ng nh???p b???ng email</h3>
                    <p>Nh???p email v?? t??i kho???n m???t kh???u c???a b???n</p>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className={cx('form-input')}>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="abc@gmail.com"
                            onChange={handleInput}
                            onFocus={() => sertError({ ...error.password })}
                        />
                    </div>
                    <p className={cx('error')}>{error.email}</p>
                    <div className={cx('form-input')}>
                        <input
                            name="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder="Nh???p m???t kh???u"
                            value={password}
                            onChange={handleInput}
                            onFocus={() =>
                                sertError({ ...error, password: '' })
                            }
                        />
                        <p className={cx('error')}>{error.password}</p>
                        {showPass ? (
                            <FontAwesomeIcon
                                onClick={() => setShowPass(false)}
                                className={cx('hide-pasword')}
                                icon={faEye}
                            />
                        ) : (
                            <FontAwesomeIcon
                                onClick={() => setShowPass(true)}
                                className={cx('show-pasword')}
                                icon={faEyeSlash}
                            />
                        )}
                    </div>
                    <div className={cx('action-btn')}>
                        {loading ? (
                            <div className={cx('loading')}>
                                <FontAwesomeIcon icon={faSpinner} />
                            </div>
                        ) : (
                            <button type="submit">????ng nh???p</button>
                        )}
                    </div>
                </form>
                <div className={cx('forgot-password')}>
                    <div
                        className={cx('login')}
                        onClick={() => setShowRegister(true)}
                    >
                        ????ng k??
                    </div>
                    <div>Qu??n m???t kh???u ?</div>
                </div>
                <div className={cx('role')}>
                    <span>
                        B???ng vi???c ti???p t???c, b???n ???? ch???p nh???n ??i???u kho???n s??? d???ng
                    </span>
                </div>
            </div>
            {/* <div className={cx("body-right")}>
        <img src={phone} alt="" />
      </div> */}
        </div>
    );
}

export default Login;
