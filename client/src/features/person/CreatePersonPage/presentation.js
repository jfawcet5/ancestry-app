//import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";

import DynamicDateField from "../../../shared/components/DynamicDateField";

import styles from "./createPerson.module.css";

export default function CreatePersonPresentation({onChange, onSubmit, pageType}) {
    let content = (
        <>
            <h1>Create Person</h1>

            <div className={styles.fieldContainer}>
                <div className={styles.inputField}>
                    <label>First Name</label>
                    <input type="text" name="firstName" onChange={onChange} required></input>
                </div>
                <div className={styles.inputField}>
                    <label>Middle Name</label>
                    <input type="text" name="middleName" onChange={onChange}></input>
                </div>
                <div className={styles.inputField}>
                    <label>Last Name</label>
                    <input type="text" name="lastName" onChange={onChange} required></input>
                </div>
            </div>

            <div className={styles.fieldContainer}>
                <div className={styles.inputField}>
                    <label>Birth Date</label>
                    <DynamicDateField name="birthDate"
                                onChange={onChange}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Death Date</label>
                    <DynamicDateField name="deathDate"
                                onChange={onChange}
                    />
                </div>
            </div>

            <div className={styles.fieldContainer}>
                <div className={styles.inputField}>
                    <label>Gender</label>
                    <select name="gender" onChange={onChange}>
                        <option value="">--Select--</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
            </div>
        </>
    )

    return (
        <>
            {pageType === "page" && 
                <form className={styles.container} onSubmit={onSubmit}>
                    {content}
                    <button>Create</button>
                </form>
            }
            {pageType === "modal" && 
                <div className={styles.container}>
                    {content}
                    <button onClick={onSubmit}>Create</button>
                </div>
            }
        </>
    )
}