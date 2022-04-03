/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate} from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import  'react-circular-progressbar/dist/styles.css' ; 
import axios from 'axios';
import dayjs from 'dayjs';
import Calendar from 'react-calendar'
import  'react-calendar/dist/Calendar.css' ; 
import Context from '../data/Context';
import logo from '../../assets/content/TrackIt.png';

function Historic(){
    const [buttonLogOf, setButtonLogOf] = useState(false);
    const { token, dataUser, percentage} = useContext(Context);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    useEffect(() => {
        !JSON.parse(localStorage.getItem('token'))&& navigate('/');
    }, []);

    function logOut(){
        localStorage.removeItem('token'); 
        window.location.reload();
    }

    return (
        <>
        <Header>
            <img src={logo} alt="logo" />
            {buttonLogOf&&<button onClick={()=>logOut()} >logout</button>}
            <Perfil onClick={()=>setButtonLogOf(!buttonLogOf)} src={dataUser.image} alt="imagem"/>
            {console.log(dataUser.image)}
        </Header>
        <Main>
            <Top>
                <h1>Histórico</h1>
            </Top>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            
        </Main>
        <Menu>
            <Link to= "/habits">
            <p>Hábitos</p>
            </Link>
            <Link to="/today">
            <button><CircularProgressbar value={percentage} text={`Hoje`} styles = { buildStyles ( { 
                textColor: '#fff',
                textSize : '23px' ,
                pathColor: '#fff',
                trailColor: '#52B6FF',
            })}/></button>
            </Link>
            <p>Histórico</p>
        </Menu>
        </>
    );
}

export default Historic;

// const Calendar = styled.div`

// `;

const Header = styled.div `
    box-sizing: border-box;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    top:0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    z-index: 1;
    font-family: 'Lexend Deca';
    button{
        position: relative;
        left:20%;
        height: 25px;
        border: none;
        border-radius:15px;
        background: #eb4949;
        color: #fff;
    }
`;
const Perfil = styled.img `
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Main= styled.div `
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    max-width: 100vw;
    height: calc(100vh - 140px);
    top:70px;
    left: 0;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 28px;
    font-family: 'Lexend Deca';
    p{
        position: relative;
        color: #666;
        font-size: 18px;
    }
    
`;
const Top = styled.div `
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-bottom: 30px;
color: #126BA5;
font-size: 23px;
`;
const Menu = styled.div `
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #FFF;
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #52B6FF;
    p{
        cursor: pointer;
    }
    button{
        width: 91px;
        height: 91px;
        border-radius: 50%;
        margin-bottom: 5vh;
        border: none;
        background: #52B6FF;
        font-size: 18px;
        color: #FFF;
        cursor: pointer;
    }
    a:link {
    color: #52B6FF!important;
    text-decoration: none!important;
    }
    a:visited {
        color:#52B6FF!important;
        text-decoration: none!important;
    }
`;