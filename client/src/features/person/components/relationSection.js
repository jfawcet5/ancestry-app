import PersonRelation from "./personRelation"
import styles from "./relationSection.module.css";

export default function RelationSection({relations}) {
    return (
        <div className={styles.container}>
            <PersonRelation title="Siblings" relations={relations.siblings}/>
            <PersonRelation title="Spouses" relations={relations.spouses}/>
            <PersonRelation title="Children" relations={relations.children}/>
        </div>
    )
}