import React, { FormEvent, FormEventHandler, useRef, useState } from 'react'
import Paper from '@mui/material/Paper';
import { getPhoneCodes } from '../api/getPhoneCodes';
import { useEffect } from 'react';
import axios from 'axios';
import urlApi from '../../api/urlApi';
import { Link } from '@nextui-org/react';
import { validateSession } from '../../hooks/validateSession';
import { useRouter } from 'next/router';

interface phoneCodes {
    code: string;
    dial_code: string;
    name: string;
}

const IndexPage = () => {

    const router = useRouter();

    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            router.push('/dashboard')
        }
    }

    const [code, setCode] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<number>();
    const [sendCode, setSendCode] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState('');
    const [token, setToken] = useState(null)

    useEffect(() => {

        if (token) {
            window.sessionStorage.setItem('accessToken', token);
        }

    }, [token])


    const [login, setLogin] = useState(true)

    const [verifyCodes, setVerifyCodes] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    });

    const [phoneCodes, setPhoneCodes] = useState<phoneCodes[]>([]);

    const code1 = useRef<HTMLInputElement>(null)
    const code2 = useRef<HTMLInputElement>(null)
    const code3 = useRef<HTMLInputElement>(null)
    const code4 = useRef<HTMLInputElement>(null)
    const code5 = useRef<HTMLInputElement>(null)
    const code6 = useRef<HTMLInputElement>(null)

    const handleChange = (event: any) => {
        setCode(event.target.value as string);
    };

    const handleNumber = (event: any) => {
        setNumber(event.target.value as number);
    };

    const handleName = (event: any) => {
        setName(event.target.value as string);
    };

    const fetchPhoneCodes = async () => {
        const phoneCodes = await getPhoneCodes();
        setPhoneCodes(phoneCodes);
    }

    const submitRegister = async (e: FormEvent) => {

        e.preventDefault();

        await urlApi.post('/auth/register', {
            name,
            country_code: code,
            number
        }).then(res => {

            setError(false)
            setMessage(res.data.message);
            setSendCode(true);
            setPhoneNumber(code + number);

        }).catch(err => {
            const message = err.response.data.message;
            setError(true);
            setMessage(message);
        });

    }

    const submitLogin = async (e: FormEvent) => {

        e.preventDefault();

        console.log(code + number)

        await urlApi.post('/auth/login', {
            country_code: code,
            number
        }).then(res => {

            console.log('a')
            setError(false);
            setMessage(res.data.message);
            setSendCode(true);
            setPhoneNumber(code + number);

        }).catch(err => {
            setError(true);
            setMessage(err.response.data.message);
        });

    }

    useEffect(() => {

        if (verificationCode) {
            urlApi.put('/auth/verifycode', {
                code: verificationCode,
                number: phoneNumber
            }).then(res => {
                setError(false);
                setMessage("Code verified successfull");
                setToken(res.data.token);
                router.replace('/messages')
            }).catch(err => {
                setError(true);
                setMessage(err.response.data.message);
            });
        }

    }, [verificationCode]);

    const submitVerifyCode = async (e: FormEvent) => {

        e.preventDefault();

        let verifyCode = verifyCodes.code1 + verifyCodes.code2 + verifyCodes.code3 + verifyCodes.code4 + verifyCodes.code5 + verifyCodes.code6;
        setVerificationCode(verifyCode);

    }

    const handleCode = (e: any) => {
        const { name, value } = e.target;
        setVerifyCodes({
            ...verifyCodes,
            [name]: value
        });
        if (value.length === 1) {
            if (name === 'code1') {
                code2.current?.select();
            } else if (name === 'code2') {
                code3.current?.select();
            } else if (name === 'code3') {
                code4.current?.select();
            } else if (name === 'code4') {
                code5.current?.select();
            } else if (name === 'code5') {
                code6.current?.select();
            }
        }
    }

    useEffect(() => {
        fetchPhoneCodes();
    }, []);

    return (
        <>

            <div className='container'>
                <div className="banner"></div>
                <div className="content">
                    {
                        sendCode && (
                            <>
                                <h4>VERIFY YOUR NUMBER</h4>
                                <form className='form' onSubmit={submitVerifyCode} >
                                    <div className='input-group-m'>
                                        <input value={verifyCodes.code1} onChange={(e) => handleCode(e)} name='code1' className="code-digit" ref={code1} id="outlined-basic" type={'number'} />
                                        <input value={verifyCodes.code2} onChange={(e) => handleCode(e)} name='code2' className="code-digit" ref={code2} id="outlined-basic" type={'number'} />
                                        <input value={verifyCodes.code3} onChange={(e) => handleCode(e)} name='code3' className="code-digit" ref={code3} id="outlined-basic" type={'number'} />
                                        <input value={verifyCodes.code4} onChange={(e) => handleCode(e)} name='code4' className="code-digit" ref={code4} id="outlined-basic" type={'number'} />
                                        <input value={verifyCodes.code5} onChange={(e) => handleCode(e)} name='code5' className="code-digit" ref={code5} id="outlined-basic" type={'number'} />
                                        <input value={verifyCodes.code6} onChange={(e) => handleCode(e)} name='code6' className="code-digit" ref={code6} id="outlined-basic" type={'number'} />
                                    </div>
                                    <input type='submit' value={'Verify Code'} />
                                </form>
                            </>
                        ) || (
                            <>
                                {
                                    login && (
                                        <>
                                            <h4>LOGIN</h4>
                                            <form className='form' onSubmit={submitLogin} >
                                                <div className='input-group-h'>
                                                    <select
                                                        id="demo-simple-select"
                                                        value={code}
                                                        onChange={handleChange}
                                                        placeholder="Select your code"
                                                    >
                                                        {/* <option key={1} selected value="+503">+503</option> */}
                                                        {
                                                            phoneCodes.map(phoneCode => (
                                                                <option key={phoneCode.code} value={phoneCode.dial_code}>{phoneCode.code} {phoneCode.dial_code}</option>

                                                            ))
                                                        }
                                                    </select>
                                                    <input value={number} onChange={handleNumber} id="outlined-basic" name='number' type={'number'} />
                                                </div>
                                                <input type='submit' value={'Go!'} />
                                            </form>
                                            <br />
                                            <Link onClick={() => setLogin(!login)} >Or Register</Link>
                                        </>
                                    ) || (
                                        <>
                                            <h4>REGISTER YOUR NUMBER</h4>
                                            <form className='form' onSubmit={submitRegister} >
                                                <input value={name} onChange={handleName} className='form-input' id="outlined-basic" type={'text'} />
                                                <div className='input-group-h'>
                                                    <select
                                                        id="demo-simple-select"
                                                        value={code}
                                                        onChange={handleChange}
                                                    >
                                                        {
                                                            phoneCodes.map(phoneCode => (
                                                                <option key={phoneCode.code} selected value={phoneCode.dial_code}>{phoneCode.code} {phoneCode.dial_code}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <input value={number} onChange={handleNumber} id="outlined-basic" name='number' type={'number'} />
                                                </div>
                                                <input type='submit' value={'Go!'} />
                                            </form>
                                            <br />
                                            <Link onClick={() => setLogin(!login)} >Or Login</Link>
                                        </>
                                    )
                                }
                            </>

                        )
                    }
                    <br />
                    {
                        sendCode && !error && <span>{message}</span>
                    }
                    {
                        error && <span>{message}</span>
                    }
                </div>
            </div>
        </>
    )
}

export default IndexPage