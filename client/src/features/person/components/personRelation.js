import { Link } from 'react-router-dom';

import styles from "./personRelation.module.css";

export default function PersonRelation({title, relations}) {
    let listItems = "No " + title.toLowerCase();

    if (relations.length > 0) {
        listItems = relations.map(item => {
            return <Link to={`/people/${item.id}`}><li>{item.name}</li></Link>
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