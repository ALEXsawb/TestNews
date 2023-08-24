import {articleAPI} from "../api/api";


const SET_ARTICLE = "SET_ARTICLE";
const ADD_SECTION = "ADD_SECTION";
const DELETE_SECTION = "DELETE_SECTION";
const DELETE_IMAGE = "DELETE_IMAGE";
const DELETE_TEXT = "DELETE_TEXT";
const UPDATE_SECTION = "UPDATE_SECTION";
const ADD_TEXT_TO_SECTION_CONTENT = "ADD_TEXT_TO_SECTION_CONTENT";
const ADD_IMG_TO_SECTION_CONTENT = "ADD_IMG_TO_SECTION_CONTENT";


const articleReducer = (state=null, action) => {
    switch (action.type) {
        case SET_ARTICLE:{
            if(action.article.sections.length !== 0){
                let sections = action.article.sections.map(section => {
                    section.content = [...section.texts.map(text_obj => ({...text_obj, type: 'text'})),
                                       ...section.images.map(text_obj => ({...text_obj, type: 'image'}))]
                    return {section, content: section.content.sort((a, b) => a.queue - b.queue)}
                })
                return {...action.article, sections: sections}
            }
            return action.article
        }
        case ADD_SECTION:{
            return {...state,
                    sections: [...state.sections,
                        {section: {images: [], texts: [], ...action.sectionData}, content: []}]}
        }
        case DELETE_SECTION:{
            return {...state,
                    sections: [...state.sections.filter(s => s.section.id !== action.sectionId)]}
        }
        case DELETE_TEXT:{
            return {...state,
                sections: [...state.sections.map(s => {
                    if(s.section.id === action.sectionId){
                        return {...s, section: {...s.section, texts: [...s.section.texts.filter(t => t.id !== action.textId)]},
                            content: [...s.content.filter(c => !(c.type === 'text' && c.id === action.textId))]}
                    }
                    return s
                })]}
        }
        case DELETE_IMAGE:{
            return {...state,
                sections: [...state.sections.map(s => {
                    if(s.section.id === action.sectionId){
                        return {...s, section: {...s.section, images: [...s.section.images.filter(t => t.id !== action.imageId)]},
                            content: [...s.content.filter(c => !(c.type === 'image' && c.id === action.imageId))]}
                    }
                    return s
                })]}
        }
        case UPDATE_SECTION:{
            return {...state,
                    sections: [...state.sections.map(s => {
                        if(s.section.id === action.sectionId){
                            return {...s, section: {...s.section, ...action.updatedData}}
                        }
                        return s
                    })]}
        }
        case ADD_TEXT_TO_SECTION_CONTENT:{
            return {...state,
                    sections: [...state.sections.map(s => {
                        if(s.section.id === action.sectionId){
                            return {...s, section: {...s.section, texts: [...s.section.texts, action.textData]},
                                          content: [...s.content, {section: action.sectionId, ...action.textData, type: 'text'}]}
                        }
                        return s
                    })]}
        }
        case ADD_IMG_TO_SECTION_CONTENT:{
            return {...state,
                    sections: [...state.sections.map(s => {
                        if(s.section.id === action.sectionId){
                            action.imageData['img'] = action.imageData['img_url']
                            return {...s, section: {...s.section, images: [...s.section.images, action.imageData]},
                                          content: [...s.content, {section: action.sectionId, ...action.imageData, type: 'image'}]}
                        }
                        return s
                    })]}
        }
        default: return state
    }
}


export const setArticleAC = (article) => ({type: SET_ARTICLE, article})
export const addSectionAC = (sectionData) => ({type: ADD_SECTION, sectionData})
export const deleteSectionAC = (sectionId) => ({type: DELETE_SECTION, sectionId})
export const deleteTextAC = (sectionId, textId) => ({type: DELETE_TEXT, sectionId, textId})
export const deleteImageAC = (sectionId, imageId) => ({type: DELETE_IMAGE, sectionId, imageId})
export const updateSectionAC = (sectionId, updatedData) => ({type: UPDATE_SECTION, sectionId, updatedData})
export const addTextToSectionContentAC = (sectionId, textData) => ({type: ADD_TEXT_TO_SECTION_CONTENT, sectionId, textData})
export const addImgToSectionContentAC = (sectionId, imageData) => ({type: ADD_IMG_TO_SECTION_CONTENT, sectionId, imageData})


export const setArticle = (slug) => (dispatch) => {
    articleAPI.getArticle(slug).then(data => {
        dispatch(setArticleAC(data))
    })
}

export const addSection = (articleId, sectionData, accessToken) => (dispatch) => {
    articleAPI.addSection(articleId, sectionData, accessToken).then(data => {
        dispatch(addSectionAC(data))
    })
}

export const deleteSection = (sectionId, accessToken) => (dispatch) => {
    articleAPI.deleteSection(sectionId, accessToken).then(
        dispatch(deleteSectionAC(sectionId))
    )
}

export const deleteText = (sectionId, TextId, accessToken) => (dispatch) => {
    articleAPI.deleteText(TextId, accessToken).then(
        dispatch(deleteTextAC(sectionId, TextId))
    )
}

export const deleteImage = (sectionId, ImageId, accessToken) => (dispatch) => {
    articleAPI.deleteImage(ImageId, accessToken).then(
        dispatch(deleteImageAC(sectionId, ImageId))
    )
}

export const changeSectionData = (sectionId, sectionData, accessToken) => (dispatch) => {
    articleAPI.updateSection(sectionId, sectionData, accessToken).then(
        dispatch(updateSectionAC(sectionId, sectionData))
    )
}

export const addTextBlockToSectionContent = (sectionId, textData, accessToken) => (dispatch) => {
    articleAPI.addTextBlockToSectionContent(textData, accessToken).then(data =>
        dispatch(addTextToSectionContentAC(sectionId, data))
    )
}

export const addImageBlockToSectionContent = (sectionId, ImageData, accessToken) => (dispatch) => {
    articleAPI.addImageToSectionContent(ImageData, accessToken).then(data =>
        dispatch(addImgToSectionContentAC(sectionId, data))
    )
}


export default articleReducer