import axios, { Axios } from "axios"

class Backend {
    axios: Axios
    constructor(){
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api'
        })
    }

    getExtensionConst(userId: string){
        return this.axios.get(`/extension-const/user/${userId}`)
    }
    
    getExtensionProviders(extensionConstantId: string){
        return this.axios.get(`/extension-const/${extensionConstantId}`)
    }
}

export default Backend