import React, { useState } from 'react';

import styles from "./DynamicDateField.module.css";

/*
const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];
*/



export default function DynamicDateField({value = "",
                                          name,
                                          readonly=false,
                                          nullValue="N/A",
                                            mainText,
                                            subText = null,
                                            linkTo = null,
                                            isEditable = false,
                                            mainTextConfig = {},
                                            subTextConfig = {},
                                            className=null,
                                            children,
                                            onChange
}) {
    const [year, month, day] = value.split("/");
    //console.error("logging date");
    //console.log(year, month, day);

    const [dateFields, setDateFields] = useState({day: day, month: month, year: year});
    
    const handleChange = (e, pattern, targetField) => {
        const val = e.target.value;

        if (pattern.test(val)) {
            const newDateFields = { ...dateFields, [targetField]: val }
            setDateFields(newDateFields);
            let combined = [newDateFields.year, newDateFields.month, newDateFields.day].join("/");
            e.target.name = name;
            e.target.value = combined;
            onChange?.(e);
        }
    }



    if (readonly) {
        if (year === "" && month === "" && day === "") {
            console.log("No date provided");
            return (
                <div>
                    <span>{nullValue}</span>
                </div>
            )
        }
        else {
            return (
                <div>
                    <span>{dateFields.year}</span>
                    {dateFields.month && <span>/{dateFields.month}</span>}
                    {dateFields.day && <span>/{dateFields.day}</span>}
                </div>
            )
        }
    }

    /*
    const mainComponent = isEditable ? <input type={inputType} value={mainText}></input> :
                                     <p className={styles.displayFieldMain}>{mainContent}</p>;*/

    return (
        <div className={styles.inputContainer}>
            <input type="text"
                   className={`${styles.dateInputSection} ${styles.year}`}
                   inputMode="numeric"
                   placeholder="yyyy"
                   name={`${name}Year`}
                   value={dateFields.year}
                   onChange={(e) => handleChange(e, /^\d{0,4}$/, "year")}
            />
            <span>/</span>
            <input type="text"
                   className={styles.dateInputSection}
                   inputMode="numeric"
                   placeholder="mm"
                   name={`${name}Month`}
                   value={dateFields.month}
                   onChange={(e) => handleChange(e, /^\d{0,2}$/, "month")}
            />
            <span>/</span>
            <input type="text"
                   className={styles.dateInputSection}
                   inputMode="numeric"
                   placeholder="dd"
                   name={`${name}Day`}
                   value={dateFields.day}
                   onChange={(e) => handleChange(e, /^\d{0,2}$/, "day")}
            />
        </div>
    );
}