import React from "react";
import Header from "./Header";
import {connect} from "react-redux"


class HeaderContainer extends React.PureComponent {
    render(){
        return <Header isAuth={this.props.user.isAuth}/>
    }
}


let mapStateToProps = (state) => {
    return ({
        user: state.user,
    })
}

const HeaderContainerSuper = connect(mapStateToProps, null)(HeaderContainer);

export default HeaderContainerSuper;