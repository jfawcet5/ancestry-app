import PersonPortrait from "./personPortrait";
import PersonDetails from "./personDetails";

import styles from "./personHeader.module.css";

function PersonHeader({personData, editMode=false}) {
    return (
        <div className={styles.container}>
        <PersonPortrait className={styles.portrait} src={personData.portrait}/>
        <PersonDetails personData={personData} editMode={editMode}/>
        </div>
    );
}

export default PersonHeader;