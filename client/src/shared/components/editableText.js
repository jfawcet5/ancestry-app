import { Link } from 'react-router-dom';

export default function EditableText({text,
                                      isEditable,
                                      inputType="text",
                                      inputName="",
                                      linkTo=null,
                                      className="",
                                      placeholder="",
                                      onChange
}) {
    if (isEditable) {
        if (inputType === "textarea") {
            return (
                <textarea name={inputName}
                          defaultValue={text}
                          className={className}
                          placeholder={placeholder}
                          onChange={onChange}
                />
            )
        }

        return (
            <input type={inputType}
                   name={inputName}
                   defaultValue={text}
                   className={className} 
                   onChange={onChange}
            />
        )
    }

    const content = text || placeholder;

    return linkTo ? <Link to={linkTo} className={className}>{text}</Link>
                    :
                    <p className={className}>{text}</p>
}