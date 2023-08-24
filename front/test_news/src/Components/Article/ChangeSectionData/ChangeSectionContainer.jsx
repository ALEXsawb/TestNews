import React from "react";
import {connect} from "react-redux"
import styles from "./ChangeSection.module.css"
import {addSection, changeSectionData} from "../../../redux/article-reducer";
import ChangeSection from "./ChangeSection";


class ChangeSectionContainer extends React.Component{
    onSubmit = (formData) => {
        this.props.changeSectionData(this.props.sectionId, formData, this.props.accessToken)
    }

    render() {
        return <div className={styles.add_section_block}>
            <ChangeSection onSubmit={this.onSubmit}/>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.user.access_token
    }
}

export default connect(mapStateToProps, {changeSectionData})(ChangeSectionContainer)