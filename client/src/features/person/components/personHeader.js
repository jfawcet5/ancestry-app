import PersonPortrait from "./personPortrait";
import PersonDetails from "./personDetails";

import styles from "./personHeader.module.css";

function PersonHeader({personData}) {
    return (
        <div className={styles.container}>
        <PersonPortrait className={styles.portrait} src={personData.portrait}/>
        <PersonDetails personData={personData}/>
        </div>
    );
}

export default PersonHeader;