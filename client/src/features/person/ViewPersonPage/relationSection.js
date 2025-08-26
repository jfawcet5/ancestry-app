import PersonRelation from "./personRelation"
import styles from "./relationSection.module.css";

export default function RelationSection({relations, isEditable=false, onChange}) {
    return (
        <div className={styles.container}>
            <PersonRelation title="Siblings" relations={relations.siblings} isEditable={false}/>
            
            <PersonRelation title="Spouses" 
                            relations={relations.spouses} 
                            isEditable={isEditable}
                            onChange={(operation, value) => onChange("spouses", operation, value)}
            />
            
            <PersonRelation title="Children" 
                            relations={relations.children} 
                            isEditable={isEditable} 
                            onChange={(operation, value) => onChange("children", operation, value)}
            />
        </div>
    )
}