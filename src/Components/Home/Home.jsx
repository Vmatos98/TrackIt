import { useState} from "react";
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from '../Layout/Layout';
import logo from '../../assets/content/logo.png';
import Loading from '../Layout/Loading';
function Home(){
    const navigate = useNavigate();
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
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
                navigate('/habits');
                console.log(response.data); 
                setDisable(false);
            });
            promise.catch(err => {
                alert(err);
                setDisable(false);
                window.location.reload();
                
            });
    }


    return(
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={send_data}>
                <input type="text" value={data.email} disabled = {disable? true:false} placeholder="email" onChange={e => setData({...data ,email :e.target.value})}/>
                <input type="text" value={data.password} disabled = {disable?true:false} placeholder="senha" onChange={e => setData({...data ,password :e.target.value})}/>
                <button disabled={(!(data.email && data.password)||disable)?true:false} type="submit">{disable?<Loading/>:"Entrar"}</button> 
            </form>
            <Link to="/signin">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Container>
    )
}



export default Home;