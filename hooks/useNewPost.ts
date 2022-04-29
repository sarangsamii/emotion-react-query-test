import axios from "axios"
import { PostItem } from "types"

export const postUser = (data:PostItem) =>{ 
    axios.post("https://jsonplaceholder.typicode.com/posts",data).then((res)=>console.log(res.data))
}
