import styles from "./personDetails.module.css"

import SimpleDisplayField from "../../../shared/components/simpleDisplayField";
import EditableText from "../../../shared/components/editableText";

export default function PersonDetails({personData, editMode=false}) {
    const fullname = `${personData.firstName} ${personData.lastName}`;

    const isEditable = false;

    let nameBanner = <h2 className={styles.banner}>{fullname}</h2>;

    if (editMode) {
        nameBanner = (
            <>
                <SimpleDisplayField label="First Name" >
                    <EditableText text={personData.firstName}
                                isEditable={editMode}
                                inputType="text"
                                inputName="firstName"
                    />
                </SimpleDisplayField>
                <SimpleDisplayField label="Middle Name" >
                    <EditableText text={personData.middleName}
                                isEditable={editMode}
                                inputType="text"
                                inputName="middleName"
                    />
                </SimpleDisplayField>
                <SimpleDisplayField label="Last Name" >
                    <EditableText text={personData.lastName}
                                isEditable={editMode}
                                inputType="text"
                                inputName="lastName"
                    />
                </SimpleDisplayField>
            </>
        );
    }

    return (
        <form className={styles.container}>
            <div className={styles.banner}>
                {nameBanner}
            </div>
            <div className={`${styles.leftColumn} ${styles.flexDetails}`}>
                <SimpleDisplayField label="Born" >
                    <EditableText text={personData.birth.date}
                                  isEditable={editMode}
                                  inputType="date"
                                  inputName="birthDate"
                    />
                    <EditableText text={personData.birth.location}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="birthLocation"
                    />
                </SimpleDisplayField>

                <SimpleDisplayField label="Died">
                    <EditableText text={personData.death.date}
                                  isEditable={editMode}
                                  inputType="date"
                                  inputName="deathDate"
                    />
                    <EditableText text={personData.death.location}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="deathLocation"
                    />
                </SimpleDisplayField>

                {personData.burial && <SimpleDisplayField label="Burial">
                        <EditableText text={personData.burial.name}
                                    isEditable={editMode}
                                    inputType="text"
                                    inputName="burialName"
                        />
                        <EditableText text={personData.burial.location}
                                    isEditable={editMode}
                                    inputType="text"
                                    inputName="burialLocation"
                        />
                    </SimpleDisplayField>
                }
                
            </div>
            <div className={`${styles.rightColumn} ${styles.flexDetails}`}>
                <SimpleDisplayField label="Mother">
                    <EditableText text={personData.mother.name}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="mother"
                                  linkTo={`/people/${personData.mother.id}`}
                    />
                </SimpleDisplayField>

                <SimpleDisplayField label="Father">
                    <EditableText text={personData.father.name}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="father"
                                  linkTo={`/people/${personData.father.id}`}
                    />
                </SimpleDisplayField>
            </div>
        </form>
    );
}



/*
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
*/