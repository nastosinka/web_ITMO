import Graph from "../../components/Graph/Graph.jsx";
import HistoryTable from "../../components/HistoryTable/HistoryTable.jsx";
import LogOutButton from "../../components/Buttons/LogOutButton.jsx";
import PointForm from "../../components/Forms/PointForm/PointForm.jsx";
import axiosUtil from "../../utils/AxiosUtil.js";
import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import styles from "./MainPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CleanTableButton from "../../components/Buttons/CleanTableButton.jsx";
import {loadPoints, loadUserData} from "../../utils/ServerDataLoadUtil.js";
import {useNavigate} from "react-router-dom";


// проблемы с map
export default function MainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.userReducer.username);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [temp, setTemp] = useState();

    function checkPoint(x, y, r) {
        setTotalPages(currentPage + 1);
        axiosUtil
            .post("main/check-point", {x, y, r})
        .then(res => {
            setTemp(res.data); // эта штука изменяется и таблица обнволяется
        });

    }
    useEffect(() => {
        loadUserData(dispatch, navigate);
        loadPoints(dispatch, navigate, currentPage, pageSize);
    }, [temp, currentPage]);

    const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
    };
    return (
        <>
            <Header/>
            <ContentContainer>
                <table>
                    <tr className={styles["menu-container"]}>
                        <td className={styles["menu-user-info-container"]}>
                            <p className={styles["username"]}>ник: {username}</p>
                        </td>
                        <td className={styles["menu-user-info-container"]}><CleanTableButton/>
                        </td>
                        <td className={styles["menu-user-info-container"]}><LogOutButton/></td>
                    </tr>
                    <tr className={styles["graph-form-container"]}>
                        <td><Graph pointChecker={checkPoint} /></td>
                        <td className={styles["history-table-container"]}><HistoryTable/></td>
                        <td className={styles["points"]}><PointForm pointChecker={checkPoint}/></td>
                    </tr>

                </table>
                <div className={styles["pagination-controls"]}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Предыдущая
                    </button>
                    <span>Страница {currentPage + 1}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Следующая
                    </button>
                </div>
            </ContentContainer>
        </>
    );
}
