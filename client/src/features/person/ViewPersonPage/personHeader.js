import PersonPortrait from "./personPortrait";
import PersonDetails from "./personDetails";

import styles from "./personHeader.module.css";

function PersonHeader({personData, editMode=false, onSelect}) {
    return (
        <div className={styles.container}>
        <PersonPortrait className={styles.portrait} src={personData.portrait}/>
        <PersonDetails className={styles.details} personData={personData} editMode={editMode} onSelect={onSelect}/>
        </div>
    );
}

export default PersonHeader;