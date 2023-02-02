import React from "react";



const TextField = (props) => {
    if (props.required==="True"){
        return <input required id={props.id} type="text" name={props.name} placeholder={props.placeholder} />;
    }
    return <input id={props.id} type="text" name={props.name} placeholder={props.placeholder} />;

    };
export default TextField;