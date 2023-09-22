
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../Services/authentication.service";
export const privateRoute = {
    // goTo,
    getRoles,
};

// function goTo(pageName, role) {
    
//     const navigate = useNavigate();


//     if (role.includes(JSON.parse(window.localStorage.getItem("userData")).roles[0])) {

//         navigate(pageName);
//     }else {
//         navigate("/");
//     }



//     // if ( role.includes(window.localStorage.getItem("userData").roles)) {

//     //     navigate(pageName);
//     // } else {
//     //     navigate("/");
//     // }
// }

function getRoles() {
    return JSON.parse(window.localStorage.getItem("userData"));
    // return authenticationService.extractData().roles;
}