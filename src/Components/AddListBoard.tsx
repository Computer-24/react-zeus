import React from 'react';
import Button from "./Button";
import Icon from "./Icon";
import {MdAdd} from "react-icons/md";

const AddListBoard = () => {
    return (
        <div>
            <Button text={"Add New Board List"} className={"hidden md:flex"}/>
            <Icon IconName={MdAdd} className={"block md:hidden"}/>
        </div>
    );
};

export default AddListBoard;