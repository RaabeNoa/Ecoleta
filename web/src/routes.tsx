import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>  {/* exact = { true } procura pela path exatamente como foi definido e não apenas pela caracter inicial*/}
            <Route component={CreatePoint} path="/create-point"/>
        </BrowserRouter>
    )
}

export default Routes;