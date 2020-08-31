import React from 'react'
import './button.css'

const Button = ({
    title = "Title",
    className,
    children
}) => (
    <div>
        <div className="btn">
            <span>{title}</span>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Button;

