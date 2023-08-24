import React from 'react';
import styles from './App.module.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import Login from "../Login/Login";
import BasePage from "../BasePage/BasePage";
import ArticlesContainer from "../Articles/ArticlesContainer";
import ArticleContainer from "../Article/ArticleContainer";


function App(props) {
    const routes = <Routes>
        <Route  path='/' element={<HeaderContainer />}>
            <Route path='/' element={<BasePage />}>
                <Route path='login' element={<Login />}/>
                <Route path='news' element={<ArticlesContainer />}/>
                <Route path='news/:article_slug' element={<ArticleContainer />}/>
            </Route>
        </Route>
    </Routes>
    return (
        <Router>
            <div className={styles.body}>
                {props.baseConfig.blackout?
                    <div className={styles.fogging} onClick={() => {props.unsetBlackout()}}>
                        <div className={styles.popUp} onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();}}>
                            {props.baseConfig.blackoutComponent}
                        </div>
                    </div> : ''}
                {routes}
            </div>
        </Router>
    );
}

export default App;