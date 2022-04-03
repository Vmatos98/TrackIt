// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../Home/Home';
import Signin from '../Signin/Signin';
import Habits from '../Habits/Habits';
import Today from '../Habits/Today';
import Historic from '../Habits/Historic';
import AppProvider from '../data/Provider';

function App(){
    
    return(
        <>
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/historic" element={<Historic />} />
                </Routes>
                
            </Router>
        </AppProvider>
        </>
    )
}
export default App;