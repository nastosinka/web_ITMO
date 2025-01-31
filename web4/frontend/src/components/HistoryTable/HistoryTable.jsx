import "./HistoryTable.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export default function HistoryTable() {
    const history = useSelector((state) => state.historyReducer.history);

    return (
        <table id="history-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>
                    <span>Попадание</span>
                </th>
                <th>
                    <span>Время запроса</span>
                </th>

            </tr>
            </thead>
            <tbody>
            {history.map((entry, index) => (
                <tr key={index}>
                    <td>{entry.x.toFixed(2)}</td>
                    <td>{entry.y.toFixed(2)}</td>
                    <td>{entry.r.toFixed(2)}</td>
                    <td>
                        <span className="lg-view">
                            {entry.hit ? "Погладил котика" : "Котик убежал"}
                        </span>
                    </td>
                    <td>
                        <span>
                            {new Date(entry.reqTime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit"})}
                        </span>
                    </td>
                    {/*<td>{entry.procTime} мкс</td>*/}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
