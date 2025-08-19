import React, {useState, useEffect} from "react";

export default function SearchSelector({placeholder=""}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <p onClick={() => setIsOpen(true)}>{placeholder}</p>
            {isOpen && (
                <div>
                    <div onClick={() => setIsOpen(false)}>X</div>
                    <p>It works</p>
                </div>
            )}
        </div>
    )
}