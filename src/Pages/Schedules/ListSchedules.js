import { Link } from "react-router-dom";

export default function ListSchedules(props) {

    return (
        <>
            <p>A Schedule is a Protocol, a strain and a Tent selected. The protocol is the events that happen over that period. A schedule would be the day by day events and tasks to perform</p>
            <p><Link to="/">Home</Link></p>
        </>
    )
}