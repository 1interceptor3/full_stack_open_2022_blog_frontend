import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? "" : "none" };
    const hideWhenVisible = { display: visible ? "none": "" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    );
});

Togglable.displayName = "Togglable";

export default Togglable;