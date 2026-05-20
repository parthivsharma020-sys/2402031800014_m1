
import react ,{useState} from "react";
import Nav2 from "./Nav2.jsx";

const Navbar=(props)=>{
    // function changetheme(){
    //     props.setTheme("light");
    // }
    return(
        <>
        <div className="nav">
            <h2>parthiv</h2>
            <Nav2 theme={props.theme}/>
        </div>
        </>
    )
}
export default Navbar;