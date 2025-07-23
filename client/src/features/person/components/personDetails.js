import styles from "./personDetails.module.css"

import SimpleDisplayField from "../../../shared/components/simpleDisplayField";

export default function PersonDetails({personData}) {
    const fullname = `${personData.firstName} ${personData.lastName}`;

    return (
        <div className={styles.container}>
            <h2 className={styles.banner}>{fullname}</h2>
            <div className={`${styles.leftColumn} ${styles.flexDetails}`}>
                <SimpleDisplayField label="Born" 
                                    mainText={personData.birth.date}
                                    subText={personData.birth.location}
                />
                <SimpleDisplayField label="Died" 
                                    mainText={personData.death.date}
                                    subText={personData.death.location}
                />
                {personData.burial && <SimpleDisplayField label="Buried"
                                    mainText={personData.burial.name}
                                    subText={personData.burial.location}
                />}
                
            </div>
            <div className={`${styles.rightColumn} ${styles.flexDetails}`}>
            <SimpleDisplayField label="Mother" 
                                mainText={personData.mother.name}
                                mainLink={`/people/${personData.mother.id}`}
                />
            <SimpleDisplayField label="Father" 
                                mainText={personData.father.name}
                                mainLink={`/people/${personData.father.id}`}
                />
            </div>
        </div>
    );
}