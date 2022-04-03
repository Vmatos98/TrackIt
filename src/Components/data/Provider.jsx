import { useState } from 'react';
import DataContext from './Context';

const AppProvider = ({children})=>{
    const localStorageToken = JSON.parse(localStorage.getItem('token'));
    let token = localStorageToken? localStorageToken : null;
    const percentageData = JSON.parse(sessionStorage.getItem('percentage'));
    const [percentage, setPercentage] = useState(0);
    const image = JSON.parse(sessionStorage.getItem('image'));
    const [dataUser, setDataUser] = useState({
        name: '',
        image: image? image: '',
        percentageBoot: percentageData?percentageData:0,
    });
    // const [token, setToken] = useState("teste");
    return(
        <DataContext.Provider value={{token, dataUser, setDataUser, percentage, setPercentage}}>
            {children}
        </DataContext.Provider>
    )
}

export default AppProvider;