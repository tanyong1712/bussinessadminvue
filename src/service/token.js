import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"

/*token刷新*/
export const refeshToken = () => {
    return fetch.get("//v1/aaa/oauth2/token/refesh")
}
