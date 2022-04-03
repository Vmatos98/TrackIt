import { useContext, useState, useEffect } from "react";
import { Link} from "react-router-dom";
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import  'react-circular-progressbar/dist/styles.css' ; 
import dayjs from 'dayjs'
import  'dayjs/locale/pt-br';
import axios from 'axios';
import Context from '../data/Context';
import logo from '../../assets/content/TrackIt.png';
import confirm from '../../assets/content/confirm.svg';

function Today() {
    const [amount, setAmount] = useState(0);
    dayjs.locale( 'pt-br' )
    console.log(dayjs( ).format( 'dddd, DD/MM','pt' ));
    const [habitsData, setHabitsData] = useState({});
    const { token, dataUser, setPercentage} = useContext(Context);
    const [buttonLogOf, setButtonLogOf] = useState(false);
    console.log("valor: ", dataUser.percentage);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
        useEffect(() => {
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);
            promise.then(response => {
                setHabitsData(response.data);
                setAmount(dataUser.percentageBoot);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    function get_data(){
        const getData = async() =>{
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);
            promise.then(response => {
                setHabitsData(response.data);
            });
        }
        getData();
    }
    
    
    function post(id, done){
    
        const url = done?`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
        :
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        console.log(url)
        const promise = axios.post(url, null, config);
        promise.then(response => {  
            console.log(response.data);
            get_data();
        });
        promise.catch(err => {
            alert(err);
        });
    }
    const done= {};
    function check(data, index){
        let count = 0;
        done[index] = data;
        if(Object.keys(done).length===habitsData.length){
        console.log(done, habitsData.length)
        Object.keys(done).map(key=>done[key]&&count++);
        setAmount(count/habitsData.length*100);
        console.log(amount)
        sessionStorage.setItem('percentage', JSON.stringify(amount));
        
        }
    }
    setPercentage(amount);
    function Habit(props){
        const {id, name, done, currentSequence, highestSequence, index} = props;
        check(done, index);
        return(
            <HabitSession>
                <h1>{name}</h1>
                
                <p>Sequência atual: <Current done = {done}>{currentSequence} dias</Current></p><br></br>
                <p>Seu recorde: <High color = {currentSequence>=highestSequence?true:false}>{highestSequence} dias</High></p>
                <Box done = {done} onClick={()=>{
                    post(id, done) 
                    }}>
                    <img src={confirm} alt="img" />
                </Box>
            </HabitSession>
        )
    }

    function logOut(){
        localStorage.removeItem('token'); 
        window.location.reload();
    }

    return token? (
        <>
        <Header>
            <img src={logo} alt="logo" />
            {buttonLogOf&&<button onClick={()=>logOut()} >logout</button>}
            <Perfil onClick={()=>setButtonLogOf(!buttonLogOf)} src={dataUser.image} alt="imagem"/>
        </Header>
        <Main>
            <Top>
                <h1>{dayjs( ).format( 'dddd, DD/MM','pt' )}</h1>
                {amount>0?
                <P1 color={amount>0?true:false} >{Math.ceil(amount)}% dos hábitos concluidos</P1>
                :
                <P1 color={amount>0?true:false}>Nenhum hábito concluído ainda</P1>}
            </Top>
            {Object.keys(habitsData).map(item=><Habit id={habitsData[item].id} name={habitsData[item].name} done={habitsData[item].done} currentSequence={habitsData[item].currentSequence} highestSequence={habitsData[item].highestSequence} index={item} />)}
        </Main>
        <Menu>
            <Link to="/habits"> <p>Hábitos</p></Link>
            <button><CircularProgressbar value={amount} text={`Hoje`} styles = { buildStyles ( { 
                textColor: '#fff',
                textSize : '23px' ,
                pathColor: '#fff',
                trailColor: '#52B6FF',
            })}/></button>
            <Link to="/historic">
            <p>Histórico</p>
            </Link>
        </Menu>
        
        </>
        
    ):(
        <>
            {setTimeout(()=>{window.location.reload();},2000)}
            <Link to="/">
                <Block src="https://yata.ostr.locaweb.com.br/b7235cea0e0b824d6c93f7cfb4784e0665907cb3febbcaad6f67cf04ce49c3d3" alt="retorne" />
            </Link>
        </>
    );
}





export default Today;

const Block = styled.img`
    width: 100%;
    margin-top: 10%;
`;
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
    
    
    `;
    const P1 = styled.div `
        position: relative;
        color: ${props=>props.color?"#8FC549":"#666"};
        font-size: 18px;
    `;

const Top = styled.div `
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
    color: #126BA5;
    font-size: 23px;
    p{
        color: #BABABA;
    }
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
    text-decoration: none!important;
    p{
        cursor: pointer;
        text-decoration: none!important;
    }
    a:link {
    color: #52B6FF!important;
    text-decoration: none!important;
    }
    a:visited {
        color:#52B6FF!important;
        text-decoration: none!important;
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
`;
const HabitSession = styled.div `

    position: relative;
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    img{
        position: relative;
        right: 0;
        top: 0;
        width: 35px;
        height: 35px;
    }
    h1{
        width: 80%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    p{
        width: 70%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
`;
const Box = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 69px;
    height: 69px;
    right: 13px;
    top: 13px;
    margin-left: 35px;
    background: ${props=>props.done?"#8FC549":"#EBEBEB"};
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
`;
const Current = styled.span `
    color: ${props=>props.done?"#8FC549":"#666666"};
`;
const High = styled.span `
    color: ${props=>props.color?"#8FC549":"#666666"};
`;