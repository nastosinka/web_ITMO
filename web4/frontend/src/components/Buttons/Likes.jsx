
import {useState} from "react";
export default function Likes() {
    const [likes, setLikes] = useState(0);
    const handleLike = () => {
        setLikes(likes + 1);
    }
    return (
        <button
            onClick={handleLike}
            className={"styles.like-button"}
        >
            Тапалка: {likes}
        </button>
    )
}
