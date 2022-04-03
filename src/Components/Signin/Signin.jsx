import { useState} from "react";
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from '../Layout/Layout';
import Loading from '../Layout/Loading';
import logo from '../../assets/content/logo.png';

function Signin() {
    const navigate = useNavigate();
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [disable, setDisable] = useState(false);
    function send_data(e){
        e.preventDefault();
        setDisable(true);
            const promise = axios.post(url, data);
            promise.then(response => {
                setDisable(false);
                navigate('/');
            });
            promise.catch(err => {
                setDisable(false);
                alert(err);
                window.location.reload();
            });
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={send_data}>
                <input type="email" value={data.email} disabled = {disable? true:false} placeholder="email" onChange={e => setData({...data ,email :e.target.value})} required/>
                <input type="password" value={data.password} disabled = {disable? true:false} placeholder="senha" onChange={e => setData({...data ,password :e.target.value})} required/>
                <input type="text" value={data.name} disabled = {disable? true:false} placeholder="nome" onChange={e => setData({...data ,name :e.target.value})} required/>
                <input type="text" value={data.image} disabled = {disable? true:false} placeholder="foto" onChange={e => setData({...data ,image :e.target.value})} required/>
                <button disabled={(!(data.email && data.password && data.name && data.image)||disable)?true:false} type="submit">{disable?<Loading/>:"Cadastrar"}</button> 
            </form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )
}

export default Signin;