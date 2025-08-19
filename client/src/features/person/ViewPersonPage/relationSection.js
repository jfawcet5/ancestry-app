import PersonRelation from "./personRelation"
import styles from "./relationSection.module.css";

export default function RelationSection({relations, isEditable=false}) {
    return (
        <div className={styles.container}>
            <PersonRelation title="Siblings" relations={relations.siblings} isEditable={isEditable}/>
            <PersonRelation title="Spouses" relations={relations.spouses} isEditable={isEditable}/>
            <PersonRelation title="Children" relations={relations.children} isEditable={isEditable}/>
        </div>
    )
}