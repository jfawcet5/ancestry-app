import React, { Children } from 'react';

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];




export default function DynamicDateField({label = null,
                                            mainText,
                                            subText = null,
                                            linkTo = null,
                                            isEditable = false,
                                            mainTextConfig = {},
                                            subTextConfig = {},
                                            className=null,
                                            children
}) {
    const date = "";

    /*
    const mainComponent = isEditable ? <input type={inputType} value={mainText}></input> :
                                     <p className={styles.displayFieldMain}>{mainContent}</p>;*/

    return (
        <div className={className ? className : containerClass}>
            {hasLabel && <label>{label}</label>}
            <div className={styles.contentContainer}>
                {children}
            </div>
        </div>
    );
}