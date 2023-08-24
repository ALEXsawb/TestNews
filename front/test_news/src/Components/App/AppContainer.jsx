import { connect } from 'react-redux'
import App from "./App";
import {unsetBlackout} from "../../redux/base-conf-reducer";
import Cookies from 'js-cookie';
import React from "react";
import {addAccessToken, verify} from "../../redux/user-reducer";


class AppContainer extends React.Component{

    componentDidMount() {
        let access_token = Cookies.get('access_token')
        let refresh_token = Cookies.get('refresh_token')
        if (access_token){
            this.props.verify(access_token, refresh_token)
        }

    }

    render() {
        return <App {...this.props}/>
    }
}


const mapStateToProps = (state) => {
    return {
        baseConfig: state.baseConfig,
        accessToken: state.user.access_token,
        refreshToken: state.user.refresh_token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        unsetBlackout: () => dispatch(unsetBlackout()),
        verify: (access_token, refresh_token) => dispatch(verify(access_token, refresh_token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
