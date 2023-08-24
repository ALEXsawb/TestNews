import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/v1/',
})

instance.addAuthorizationToHeaders = (access_token) => {
    instance.defaults.headers.common['Authorization'] = `JWT ${access_token}`
    return instance
}

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export const authAPI = {
    login(username, password){
        return instance.post('token/', {username, password})
    },
    verify(access_token){
        return instance.post('token/verify/', {token: access_token})
    },
    refresh(refresh_token){
        return instance.post('token/refresh/', {refresh: refresh_token})
    },
    logout(){
        return instance.get('logout')
    }
}


export const articleAPI = {
    getArticles(page){
        return instance.get(`news/?limit=5&offset=${(page-1)*5}`).then(response => {
            if (response.status === 200){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    getArticlesByCategory(category_name, page){
        return instance.get(`news/?category_name=${category_name}&limit=5&offset=${(page-1)*5}`).then(response => {
            if (response.status === 200){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    changeArticle(articleSlug, updatedData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).put(`news/${articleSlug}/`, {...updatedData, category: Number(updatedData.category)}).then(response => {
            if (response.status === 200){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    deleteArticle(articleSlug, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).delete(`news/${articleSlug}/`)
    },
    setArticle(articleData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).post(`news/`, articleData).then(response => {
            if (response.status === 201){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    getCategories(){
        return instance.get(`news/categories/`).then(response => {
            if (response.status === 200){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    getArticle(slug){
        return instance.get(`news/${slug}`).then(response => {
            if (response.status === 200){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    addSection(articleId, sectionData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).post(`news/sections/`, {article: articleId, ...sectionData}).then(response => {
            if (response.status === 201){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    deleteSection(sectionId, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).delete(`news/sections/${sectionId}/`)
    },
    deleteText(TextId, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).delete(`news/texts/${TextId}/`)
    },
    deleteImage(ImageId, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).delete(`news/images/${ImageId}/`)
    },
    updateSection(sectionId, updatedData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).put(`news/sections/${sectionId}/`, updatedData)
    },
    addTextBlockToSectionContent(TextData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).post(`news/texts/`, TextData).then(response => {
            if (response.status === 201){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
    addImageToSectionContent(ImageData, accessToken){
        return instance.addAuthorizationToHeaders(accessToken).post(`news/images/`, ImageData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
            if (response.status === 201){
                return response.data
            }
            else{
                alert(response.data)
            }
        })
    },
}