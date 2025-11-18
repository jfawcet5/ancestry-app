import defaultAvatar from "../../../assets/avatar-default.png";

export default function PersonPortrait({src, className}) {
    return (
        <div className={className}>
            <img src={src || defaultAvatar} alt="portrait"/>
        </div>
    )
}