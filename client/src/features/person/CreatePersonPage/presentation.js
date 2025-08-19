import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./createPerson.module.css";

export default function CreatePersonPresentation({onChange, onSubmit}) {
    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                
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
                        <input type="text" name="birthDate" onChange={onChange} required></input>
                    </div>
                    <div className={styles.inputField}>
                        <label>Death Date</label>
                        <input type="text" name="deathDate" onChange={onChange}></input>
                    </div>
                </div>

                <button>Create</button>
            </form>
        </>
    )
}