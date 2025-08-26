import { Link } from 'react-router-dom';

import SimpleDisplayField from "../../../shared/components/simpleDisplayField";
import EditableText from "../../../shared/components/editableText";
import InputPopup from '../../../shared/components/InputPopup';

import styles from "./personRelation.module.css";


export default function PersonRelation({title, relations, isEditable=false, onChange}) {
    let listItems = "No " + title.toLowerCase();
    //const isEditable = false;

    if (relations.length > 0) {
        /*
        listItems = relations.map(item => {
            let value = (
                <SimpleDisplayField className={styles.relation}>
                    <EditableText text={item.name}
                                  isEditable={false}
                                  inputType="text"
                                  inputName="mother"
                    />
                </SimpleDisplayField>
            );
            
            if (item.dates) {
                let endDate = `${item.dates.start} to ${item.dates.end ? item.dates.end : "(—)"}`;
                value = <SimpleDisplayField label={item.name}
                                            mainText={endDate}
                />
            }

            return (
                <Link to={`/people/${item.id}`}>
                    <li key={item.id}>
                        {value}
                    </li>
                </Link>
            );
        });
        */
       listItems = relations.map(item => {
        return (
            <div className={styles.listItem}>
                <Link to={`/people/${item.id}`}>
                    <li key={item.id}>
                        {item.name}
                    </li>
                </Link>
                {isEditable && <button className={styles.removeButton} onClick={() => onChange("remove", item)}>X</button>}
            </div>
        );
       })
    }

    return (
        <div className={styles.relationContainer}>
            <div className={styles.headerBar}>
                <h2 className={styles.title}>{title}</h2>
                {isEditable && <InputPopup className={styles.addButton}
                                             label={`Add to ${title}`}
                                             inputType="Person"
                                             onSelect={value => onChange("add", value)}
                                />}
            </div>
            <div className={styles.relationListContainer}>
                <ul className={styles.relationList}>
                    {listItems}
                </ul>
            </div>
        </div>
    );
}
