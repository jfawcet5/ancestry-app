import React, {useCallback, useState} from "react";
import PopupModal from "../PopupModal";

import {TabController, Tab} from "../TabController/index.js";
import CreatePersonPage from "../../../features/person/CreatePersonPage/index.js";

import styles from "./styles.module.css";

export default function InputPopup({label = "Edit",
                                    value,
                                    inputType
}) {
    const [isOpen, setIsOpen] = useState(false);

    /*
    const onClose = useCallback(() => {
        console.log("Input Popup: onClose");
        console.log("Setting modal open to false");
        setIsOpen(prev => {
            console.log("previous: ", prev);
            return false;
        });
    }, []);
    */

    let content = <></>

    switch(inputType) {
        case "Person":
            content = (
                <TabController>
                    <Tab name="Search">
                        <p>Find person</p>
                    </Tab>
                    <Tab name="Create">
                        <CreatePersonPage />
                    </Tab>
                </TabController>
            )
            break;
        default:
            break;
    }



    const onClose = () => {
        console.warn("Input Popup: onClose");
        console.log("Setting modal open to false");
        setIsOpen(false);
    };

    return (
        <div className={styles.container} onClick={() => setIsOpen(true)}>
            <div className={styles.valueField}>{value}</div>

            <PopupModal label={label} isOpen={isOpen} onClose={onClose}>
                {content}
            </PopupModal>
        </div>
    )
}