/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect} from "react";
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from '../Layout/Layout';
import logo from '../../assets/content/logo.png';
import Loading from '../Layout/Loading';
import DataContext from '../data/Context';

function Home(){
    const navigate = useNavigate();
    const {token, dataUser, setDataUser}= useContext(DataContext)
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [disable, setDisable] = useState(false);
    const updateLocalStorage = (data) => {
        localStorage.setItem('token', JSON.stringify(data.data.token));
    }
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('token'))){
            console.log(token)
            navigate('/habits')
        }
    }, []);

    function send_data(data){
        setDataUser({...dataUser, name:data.data.name});
        sessionStorage.setItem('image', JSON.stringify(data.data.image));
        updateLocalStorage(data);
        console.log("perfil: ",dataUser.image);
        setDisable(false);
        
    }

    function postData(e){
        e.preventDefault();
        setDisable(true);
            const promise = axios.post(url, data);
            promise.then(response => {
                send_data(response);
                navigate('/habits');   
            
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
            <form onSubmit={postData}>
                <input type="email" value={data.email} disabled = {disable? true:false} placeholder="email" onChange={e => setData({...data ,email :e.target.value})} required/>
                <input type="password" value={data.password} disabled = {disable?true:false} placeholder="senha" onChange={e => setData({...data ,password :e.target.value})} required/>
                <button disabled={(!(data.email && data.password)||disable)?true:false} type="submit">{disable?<Loading/>:"Entrar"}</button> 
            </form>
            <Link to="/signin">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
            
        </Container>
    )
}



export default Home;