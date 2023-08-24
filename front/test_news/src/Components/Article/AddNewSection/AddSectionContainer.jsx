import React from "react";
import {connect} from "react-redux"
import styles from "./AddSection.module.css"
import AddSection from "./AddSection";
import {addSection} from "../../../redux/article-reducer";


class AddSectionContainer extends React.Component{
    onSubmit = (formData) => {
        this.props.addSection(this.props.articleId, formData, this.props.accessToken)
    }

    render() {
        return <div className={styles.add_section_block}>
            <AddSection onSubmit={this.onSubmit}/>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.user.access_token
    }
}

export default connect(mapStateToProps, {addSection})(AddSectionContainer)