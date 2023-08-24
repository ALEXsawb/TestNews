import React from 'react';
import styles from './Header.module.css';
import {Link, Outlet} from "react-router-dom";



const Header = (props) => {
    return <><div className={`${styles.header} ${styles.grid}`}>
        <div className={styles.grid__body}>
            <div className={`${styles.grid__item} ${styles.logo}`}>
                <a href='/PyCharm/TestNews/front/test_news/public'>LOGO</a>
            </div>
            <div className={styles.auth}>
                {props.isAuth? <div><Link to={'login'}>Logout</Link></div>: <div><Link to={'login'}>Login</Link></div>}
            </div>
        </div>
    </div>
    <Outlet />
    </>
}

export default Header;