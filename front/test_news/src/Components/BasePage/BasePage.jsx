import React from 'react';
import styles from './BasePage.module.css';
import {Outlet} from "react-router-dom";

const BasePage = () => {
    return <div className={styles.content}><Outlet /></div>
}

export default BasePage;