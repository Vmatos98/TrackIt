/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import styled, {css} from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import  'react-circular-progressbar/dist/styles.css' ; 
import axios from 'axios';
import Context from '../data/Context';
import logo from '../../assets/content/TrackIt.png';
import trashIcon from '../../assets/content/Vector.png'
import Loading from '../Layout/Loading';

function Habits() {
    const navigate = useNavigate();
    const [habitsData, setHabitsData] = useState({});
    const [disable, setDisable] = useState(false);
    const [habit, setHabit] = useState("");
    const [visible, setVisible] = useState(false);
    const [buttonLogOf, setButtonLogOf] = useState(false);
    const [selectDay, setSelectDay] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
    });
    var days =[];
    const { token, dataUser, percentage} = useContext(Context);
    console.log("valor: ", dataUser.percentage);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
        useEffect(() => {
            const getData = async() =>{
                try {
                    const {data} = await axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);
                    setHabitsData(data);
                    console.log(habitsData);
                }catch (error) {
                    // alert("Ocorreu um error ao carregar os dados");
                }
            }
            getData();

        }, []);

        useEffect(() => {
            !JSON.parse(localStorage.getItem('token'))&& navigate('/');
        }, []);
    function get_data(){
        const getData = async() =>{
            try {
                const {data} = await axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);
                setHabitsData(data);
                console.log(habitsData);
            }catch (error) {
                // alert("Ocorreu um error ao carregar os dados");
            }
        }
        getData();
    }
    function control(){
        console.log(habit);
        setDisable(true);
        Object.keys(selectDay).map((key, index)=>{
            selectDay[key]&& days.push(key);
        })
        if(days.length>0) postData()
        else{alert("Selecione pelo menos um dia");
        setDisable(false);}
    }

    function postData(){
        const data = {
            name: habit,
            days: days
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
            const promise = axios.post(url, data, config);
            promise.then(response => {  
                console.log(response.data);
                setDisable(false);
                clear()
                get_data();
            });
            promise.catch(err => {
                alert(err);
                clear()
                setDisable(false);
            });
    }
    function clear(){
        setHabit("");
        setVisible(false);
        Object.keys(selectDay).map((key, index)=>{
            selectDay[key] = false;
        })
    }

    function Delete(id, header){
        // eslint-disable-next-line no-restricted-globals
        var shouldDelete = confirm('Deseja apagar esse hábito?');
        if (shouldDelete) {
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
            axios.delete(url, header).then(response => {
                console.log(response.data);
                get_data()
                // window.location.reload();
            })
        }
    }

    function logOut(){
        localStorage.removeItem('token'); 
        window.location.reload();
    }

    function Habit(props){
        const {id, name, days, header} = props;
        console.log(id);
        return(
            <HabitSession>
                <p>{name}</p>
                <img onClick={()=>Delete(id, header)} src={trashIcon} alt="" />
                <Button selected={days.includes(0)?true:false} >D</Button>
                <Button selected={days.includes(1)?true:false} >S</Button>
                <Button selected={days.includes(2)?true:false} >T</Button>
                <Button selected={days.includes(3)?true:false} >Q</Button>
                <Button selected={days.includes(4)?true:false} >Q</Button>
                <Button selected={days.includes(5)?true:false} >S</Button>
                <Button selected={days.includes(6)?true:false} >S</Button>
            </HabitSession>
        )
    }

    return token? habitsData.length>0? (
        <>
        <Header>
            <img src={logo} alt="logo" />
            {buttonLogOf&&<button onClick={()=>logOut()} >logout</button>}
            <Perfil onClick={()=>setButtonLogOf(!buttonLogOf)} src={dataUser.image} alt="imagem"/>
        </Header>
        <Main>
            <Top>
                <h1>Meus hábitos</h1>
                <Button plus onClick={()=>setVisible(!visible)}>+</Button>
            </Top>
            {visible? 
            <New>
                <input type="text" placeholder="nome do hábito" value={habit} onChange={e => setHabit(e.target.value)}/>
                <Buttons>
                    <Button disabled={disable} selected={selectDay[0]} onClick={()=>{setSelectDay({...selectDay, 0:!selectDay[0]})}}>D</Button>
                    <Button disabled={disable}  selected={selectDay[1]} onClick={()=>{setSelectDay({...selectDay, 1:!selectDay[1]})}}>S</Button>
                    <Button disabled={disable}  selected={selectDay[2]} onClick={()=>{setSelectDay({...selectDay, 2:!selectDay[2]})}}>T</Button>
                    <Button disabled={disable}  selected={selectDay[3]} onClick={()=>{setSelectDay({...selectDay, 3:!selectDay[3]})}}>Q</Button>
                    <Button disabled={disable}  selected={selectDay[4]} onClick={()=>{setSelectDay({...selectDay, 4:!selectDay[4]})}}>Q</Button>
                    <Button disabled={disable}  selected={selectDay[5]} onClick={()=>{setSelectDay({...selectDay, 5:!selectDay[5]})}}>S</Button>
                    <Button disabled={disable}  selected={selectDay[6]} onClick={()=>{setSelectDay({...selectDay, 6:!selectDay[6]})}}>S</Button>
                </Buttons>
                <p2 onClick={()=>setVisible(!visible)}>Cancelar</p2>
                <Button save onClick={control} >{disable?<Loading/>:'Salvar'}</Button>
            </New>:<></>}
            {habitsData.length>0?
            Object.keys(habitsData).map(item=><Habit id={habitsData[item].id} name={habitsData[item].name} days={habitsData[item].days} header={config} />)
            :
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            }
        </Main>
        <Menu>
            <p>Hábitos</p>
            <Link to="/today">
            <button><CircularProgressbar value={percentage} text={`Hoje`} styles = { buildStyles ( { 
                textColor: '#fff',
                textSize : '23px' ,
                pathColor: '#fff',
                trailColor: '#52B6FF',

            })}/></button>
            </Link>
            <Link to="/historic">
            <p>Histórico</p>
            </Link>
        </Menu>
        </>
    ):(
        <>
        </>
    )
    :(
        <>
            {setTimeout(()=>{window.location.reload();},1000)}
        </>
    );
}





export default Habits;


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

const New = styled.div`

    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    background: #FFF;
    padding: 16px;
    margin-bottom: 30px;
    input{
        position: relative;
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 20px;
        color: #666666;
    }
    input::placeholder { 
        color: #DBDBDB;
        opacity: 1;
    }
    p2{
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52B6FF;
        margin-left: 125px;
        margin-right: 16px;
        cursor: pointer;
    }
`;
const Buttons = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 29px;
    
    display: flex;
    justify-content: start;
    align-items: top;
`;
const Button = styled.button`
    width: 30PX;
    height: 30PX;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background: ${props=>props.selected?"#CFCFCF":"#FFFFFF"};
    color: ${props=>props.selected?"#FFF":"#DBDBDB"};
    margin-right: 5px;
    cursor: pointer;
    ${props => props.plus && css`
        width: 40px;
        height: 35px;
        font-weight: 400;
        font-size: 26.976px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #52B6FF;
        color: #FFF;
        border-radius: 5px;
        border: none;
        
    `}
    ${props => props.save && css`
        position: relative;
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        font-size: 16px;
        color: #FFFFFF;
        /* left: 46%; */
    `}
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
        width: 13px;
        height: 15px;
    }
    p{
        width: 95%;
    }
`;