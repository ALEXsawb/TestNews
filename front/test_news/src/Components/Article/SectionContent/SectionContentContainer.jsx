import React from "react";
import {connect} from "react-redux"
import styles from "./SectionContent.module.css"
import {
    addImageBlockToSectionContent,
    addTextBlockToSectionContent,
} from "../../../redux/article-reducer";
import SectionImgContent from "./SectionImgContent";
import SectionTextContent from "./SectionTextContent";


class SectionContentContainer extends React.Component{
    state = {
        typeOfObject: 'text'
    }

    changeTypeOfObjectState = (type) => {
        this.setState({typeOfObject: type})
    }

    onTextSubmit = (formData) => {
        this.props.addTextBlockToSectionContent(this.props.sectionId, {section: this.props.sectionId, ...formData}, this.props.accessToken)
    }

    onImgSubmit = (formData) => {
        this.props.addImageBlockToSectionContent(this.props.sectionId, {section: this.props.sectionId, ...formData}, this.props.accessToken)
    }

    render() {
        let buttons = []
        let form
        if (this.state.typeOfObject === 'text'){
            buttons.push(<button className={`${styles.type_button} ${styles.selected_button}`}>Text</button>)
            buttons.push(<button className={styles.type_button} onClick={() => {this.changeTypeOfObjectState('image')}}>Image</button>)
            form = <SectionTextContent onSubmit={this.onTextSubmit} />
        }
        else if(this.state.typeOfObject === 'image'){
            buttons.push(<button className={styles.type_button} onClick={() => {this.changeTypeOfObjectState('text')}}>Text</button>)
            buttons.push(<button className={`${styles.type_button} ${styles.selected_button}`}>Image</button>)
            form = <SectionImgContent onSubmit={this.onImgSubmit} />
        }
        return <div className={styles.add_section_content_block}>
            <div className={styles.change_content_type}>
                {buttons}
            </div>
            {form}
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.user.access_token
    }
}

export default connect(mapStateToProps, {addTextBlockToSectionContent, addImageBlockToSectionContent})(SectionContentContainer)