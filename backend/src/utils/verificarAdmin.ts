import { ShowUsersService } from "../modules/User/service/ShowUserService";

export default async function verificarAdmin(id: string){
    const showUsersService = new ShowUsersService()
    const user = await showUsersService.execute(id);
    if (user.email === "inaciofilho.lima@gmail.com"){
        return true
    }
    return false
}