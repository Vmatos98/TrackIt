import styled from "styled-components";


const Container = styled.div `
position: absolute;
width: 100%;
height: 100%;
max-width: 500px;
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;
background: #FFFFFF;
img{
    position: relative;
    margin-top: 67px;
}
form{
    position: relative;
    margin-top: 35px;
    display: flex;
    flex-direction: column;

    input{
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        margin-bottom: 10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    input::placeholder { 
        color: #DBDBDB;
        opacity: 1;
    }
    input:disabled{
        color: #AFAFAF;
    }
    button{
        background: #52B6FF;
        border-radius: 4px;
        width: 303px;
        height: 45px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button:disabled {

        opacity: 0.7;
    }
}
p{
    position: relative;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    margin-top:25px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;

    color: #52B6FF;
}
`;


export default Container;
