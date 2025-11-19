import React, {useState} from "react";
import PopupModal from "../PopupModal";

import {TabController, Tab} from "../TabController/index.js";

import CreatePersonPage from "../../../features/person/CreatePersonPage/index.js";
import SearchPersonPage from "../../../features/person/SearchPersonPage/index.js";

import styles from "./styles.module.css";

export default function InputPopup({label = "Edit",
                                    value,
                                    inputType,
                                    onSelect,
                                    className
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

    const handleSelect = (e, value) => {
        e.preventDefault();
        console.log("Selected an item: ", value);
        onSelect(value);
        setIsOpen(false);
    }

    switch(inputType) {
        case "Person":
            content = (
                <TabController>
                    <Tab name="Search">
                        <SearchPersonPage pageType="modal" onSelect={handleSelect}/>
                    </Tab>
                    <Tab name="Create">
                        <CreatePersonPage pageType="modal" onSelect={handleSelect}/>
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

    const displayValue = value ?? "+";

    return (
        <div className={`${styles.container} ${className}`} onClick={() => setIsOpen(true)}>
            <div className={styles.valueField}>{displayValue}</div>

            <PopupModal label={label} isOpen={isOpen} onClose={onClose}>
                {content}
            </PopupModal>
        </div>
    )
}