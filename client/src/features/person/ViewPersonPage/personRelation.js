import { Link } from 'react-router-dom';

import SimpleDisplayField from "../../../shared/components/simpleDisplayField";
import EditableText from "../../../shared/components/editableText";
import InputPopup from '../../../shared/components/InputPopup';

import styles from "./personRelation.module.css";


export default function PersonRelation({title, relations, isEditable=false}) {
    let listItems = "No " + title.toLowerCase();
    //const isEditable = false;

    if (relations.length > 0) {
        listItems = relations.map(item => {
            let value = (
                <SimpleDisplayField className={styles.relation}>
                    {!isEditable && <EditableText text={item.name}
                                  isEditable={isEditable}
                                  inputType="text"
                                  inputName="mother"
                    />}
                    {isEditable && <InputPopup value={item.name}/>}
                </SimpleDisplayField>
            );
            
            if (item.dates) {
                let endDate = `${item.dates.start} to ${item.dates.end ? item.dates.end : "(—)"}`;
                value = <SimpleDisplayField label={item.name}
                                            mainText={endDate}
                />
            }

            if (isEditable) {
                return (
                    <li key={item.id}>
                        {value}
                    </li>
                )
            }

            return (
                <Link to={`/people/${item.id}`}>
                    <li key={item.id}>
                        {value}
                    </li>
                </Link>
            );
        });
    }

    return (
        <div className={styles.relationContainer}>
            <h2>{title}</h2>
            <div className={styles.relationListContainer}>
                <ul className={styles.relationList}>
                    {listItems}
                </ul>
            </div>
        </div>
    );
}
