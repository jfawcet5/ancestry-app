import styles from "./personDetails.module.css"

import SimpleDisplayField from "../../../shared/components/simpleDisplayField";
import EditableText from "../../../shared/components/editableText";
import InputPopup from "../../../shared/components/InputPopup";
import DynamicDateField from "../../../shared/components/DynamicDateField";
import { Link } from "react-router-dom";

export default function PersonDetails({personData, editMode=false, onSelect}) {
    const fullname = `${personData.firstName} ${personData.middleName} ${personData.lastName}`;
    console.log("Person Data")
    console.log(personData);

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
                                onChange={(e) => onSelect(e.target.name, e.target.value)}
                    />
                </SimpleDisplayField>
                <SimpleDisplayField label="Middle Name" >
                    <EditableText text={personData.middleName}
                                isEditable={editMode}
                                inputType="text"
                                inputName="middleName"
                                onChange={(e) => onSelect(e.target.name, e.target.value)}
                    />
                </SimpleDisplayField>
                <SimpleDisplayField label="Last Name" >
                    <EditableText text={personData.lastName}
                                isEditable={editMode}
                                inputType="text"
                                inputName="lastName"
                                onChange={(e) => onSelect(e.target.name, e.target.value)}
                    />
                </SimpleDisplayField>
            </>
        );
    }

    return (
        <form className={styles.container}>
            <div className={styles.banner}>
                {nameBanner}
                {!editMode && <Link to={`/treeview/${personData.id}`}>{">"}</Link>}
            </div>
            <div className={`${styles.leftColumn} ${styles.flexDetails}`}>
                <SimpleDisplayField label="Born" >
                    <DynamicDateField name="birthDate"
                                      readonly={!editMode}
                                      value={personData.birthDate}
                                      nullValue="n/a"
                                      onChange={(e) => onSelect(e.target.name, e.target.value)}
                    />
                    <EditableText text={personData.birthLocation}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="birthLocation"
                    />
                </SimpleDisplayField>

                <SimpleDisplayField label="Died">
                    <DynamicDateField name="deathDate"
                                      readonly={!editMode}
                                      value={personData.deathDate}
                                      nullValue="n/a"
                                      onChange={(e) => onSelect(e.target.name, e.target.value)}
                    />
                    <EditableText text={personData.deathLocation}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="deathLocation"
                    />
                </SimpleDisplayField>

                {personData.burial && <SimpleDisplayField label="Burial">
                        <EditableText text={"null"}
                                    isEditable={editMode}
                                    inputType="text"
                                    inputName="burialName"
                        />
                        <EditableText text={"null"}
                                    isEditable={editMode}
                                    inputType="text"
                                    inputName="burialLocation"
                        />
                    </SimpleDisplayField>
                }
                
            </div>
            <div className={`${styles.rightColumn} ${styles.flexDetails}`}>
                <SimpleDisplayField label="Mother">
                    {!editMode && <EditableText text={personData.mother.name}
                                  isEditable={false}
                                  inputType="text"
                                  inputName="mother"
                                  linkTo={`/people/${personData.mother.id}`}
                    />}
                    {editMode && <InputPopup value={personData.mother.name}
                                             label={`Associate Mother to ${personData.firstName} ${personData.lastName}`}
                                             inputType="Person"
                                             onSelect={(value) => onSelect("mother", value)}
                                />}
                </SimpleDisplayField>

                <SimpleDisplayField label="Father">
                    {!editMode && <EditableText text={personData.father.name}
                                  isEditable={editMode}
                                  inputType="text"
                                  inputName="father"
                                  linkTo={`/people/${personData.father.id}`}
                    />}
                    {editMode && <InputPopup value={personData.father.name}
                                             label={`Associate Father to ${personData.firstName} ${personData.lastName}`}
                                             inputType="Person"
                                             onSelect={(value) => onSelect("father", value)}
                                />}
                </SimpleDisplayField>
            </div>
        </form>
    );
}