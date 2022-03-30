import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from '../Home/Home';
import Signin from '../Signin/Signin';
import Habits from '../Habits/Habits';
function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/habits" element={<Habits />} />
            </Routes>    
        </Router>
    )
}
export default App;