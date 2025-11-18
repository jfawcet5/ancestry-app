import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

export function TabController({ children }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabs = React.Children.toArray(children).filter(Boolean);

    const handleTabSwitch = (e, index) => {
        e.preventDefault();
        setActiveTabIndex(index);
        console.log("Switch Tab");
    }

    if (tabs.length < 2) {
        return children;
    }

    return (
        <div>
            <div>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={(e) => handleTabSwitch(e, index)}
                    >
                        {tab.props.name}
                    </button>
                ))}
            </div>

            <div>
                {tabs[activeTabIndex]}
            </div>
        </div>
    );
}


export function Tab({children})  {
    return children;
}

//export default {TabController, Tab};