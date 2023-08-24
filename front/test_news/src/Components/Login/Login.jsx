import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../redux/user-reducer";
import  { useNavigate } from 'react-router-dom'


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='username' placeholder={'username'}/>
        <br/>
        <Field component="input" name='password' placeholder={'password'} type="password"/>
        <br />
        <button>Login</button>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props) => {
    const redirect_to = useNavigate()
    const onSubmit = (formData) => {
        if(props.refresh_token){
            props.login(formData.username, formData.password, props.refresh_token)
        }
        else{
            props.login(formData.username, formData.password)
        }
    }
    if(props.isAuth){
        redirect_to('/news')
    }

    return <div>
        <p>Login</p>
        <LoginReduxForm onSubmit={onSubmit} />
        <button onClick={() => {props.logout(); redirect_to('/news')}}>Logout</button>
    </div>
}



const mapStateToProps = (state) => {
    return {isAuth: state.user.isAuth,
            refresh_token: state.user.refresh_token}
}


export default connect(mapStateToProps, {login, logout})(Login)