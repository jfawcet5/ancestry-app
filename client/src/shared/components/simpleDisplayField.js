import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./simpleDisplayField.module.css";

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