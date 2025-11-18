//import React, { Children } from 'react';
//import { Link } from 'react-router-dom';
//import EditableText from './editableText';

import styles from "./simpleDisplayField.module.css";

/*
    <div>
        <label>Born</label>
        <div>
        <input type="date" name="birthDate" value={`${personData.birth.date}-01-01`} onChange={(e) => e.target.value}></input>
        <input type="text" name="birthLocation" value={personData.birth.location}></input>
        </div>
        
    </div>
*/

export default function SimpleDisplayField({label = null,
                                            mainText,
                                            subText = null,
                                            linkTo = null,
                                            isEditable = false,
                                            mainTextConfig = {},
                                            subTextConfig = {},
                                            className=null,
                                            children
}) {
    const hasLabel = !!label;
    //const isLink = !!linkTo;

    const containerClass = `${styles.container} ${hasLabel ? styles["container-labeled"] : styles["container-single"]}`;

    //const mainContent = isLink ? <Link to={linkTo}>{mainText}</Link> : mainText;

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












/*


export default function SimpleDisplayField({label = null,
                                            mainText,
                                            subText = null,
                                            linkTo = null,
                                            isEditable = false,
                                            mainTextConfig = {},
                                            subTextConfig = {},
                                            children
}) {
    const hasLabel = !!label;
    const isLink = !!linkTo;

    const containerClass = `${styles.container} ${hasLabel ? styles["container-labeled"] : styles["container-single"]}`;

    const mainContent = isLink ? <Link to={linkTo}>{mainText}</Link> : mainText;

    const mainComponent = isEditable ? <input type={inputType} value={mainText}></input> :
                                     <p className={styles.displayFieldMain}>{mainContent}</p>;

    return (
        <div className={containerClass}>
            {children}
            {hasLabel && <label>{label}</label>}
            <div className={styles.contentContainer}>
                <EditableText text={mainText}
                              {...mainTextConfig}
                              className={styles.displayFieldMain}
                />
                {subText && <EditableText text={subText}
                              {...subTextConfig}
                              className={styles.displayFieldSub} />}
            </div>
        </div>
    );
}

*/

/*
export default function SimpleDisplayField({label = null, 
                                            mainText, 
                                            subText = null,
                                            mainLink = null, 
                                            align = "left"}) {
    const hasLabel = !!label;
    const containerClass = `${styles.container} ${hasLabel ? styles["container-labeled"] : styles["container-single"]}`;
    
    const mainContent = mainLink ? <Link to={mainLink}>{mainText}</Link> : mainText;
    
    return (
        <div className={containerClass}>
            {hasLabel && <div className={styles["display-field-label"]}>{label}</div>}
            <div>
                <div className={styles["display-field-main"]}>{mainContent}</div>
                {subText && <div className={styles["display-field-sub"]}>{subText}</div>}
            </div>
        </div>
    )
}
    */