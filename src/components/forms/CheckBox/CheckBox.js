import React from "react";



const CheckBox = (props) => {
    return <input type="checkbox" id={props.id} name={props.name} value = {props.value} />;
};
export default CheckBox;