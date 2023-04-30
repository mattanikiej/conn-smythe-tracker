import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import "./StatRankings.css";

function StatRankings(props) {
    // ensure we always get a lowercase stat for the api and table
    const stat = props.stat.toLowerCase();
    const [statData, setStatData] = useState([]);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(true);

    // get data from api on first render
    useEffect(() => {
        const getStatLeaders = () => {
            const headers = { mode: "no-cors"}
            const host = "https://api.nhle.com";
            const path =
                "/stats/rest/en/leaders/skaters/" +
                stat +
                "?cayenneExp=season=20222023%20and%20gameType=3";

            fetch(
                `https://api.allorigins.win/get?url=${encodeURIComponent(
                    host + path
                )}`, headers
            )
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error("Network response was not ok.");
                })
                .then((data) => {
                    const newStatData = JSON.parse(data.contents);
                    console.log(data);
                    setStatData(newStatData.data);
                });
        };
        getStatLeaders();
    // eslint-disable-next-line
    }, []);

    // update table data when the api is pulled
    // cant be dynamic since the key is different for each stat
    useEffect(() => {
        if (stat === "goals") {
            setLoading(false);
            setTableData(
                statData.map((player) => (
                    <tr key={player.player.id}>
                        <td>{player.player.fullName}</td>
                        <td>{player.player.positionCode}</td>
                        <td>{player.team.triCode}</td>
                        <td>{player.goals}</td>
                    </tr>
                ))
            );
        }

        if (stat === "assists") {
            setLoading(false);
            setTableData(
                statData.map((player) => (
                    <tr key={player.player.id}>
                        <td>{player.player.fullName}</td>
                        <td>{player.player.positionCode}</td>
                        <td>{player.team.triCode}</td>
                        <td>{player.assists}</td>
                    </tr>
                ))
            );
        }

        if (stat === "points") {
            setLoading(false);
            setTableData(
                statData.map((player) => (
                    <tr key={player.player.id}>
                        <td>{player.player.fullName}</td>
                        <td>{player.player.positionCode}</td>
                        <td>{player.team.triCode}</td>
                        <td>{player.points}</td>
                    </tr>
                ))
            );
        }
    }, [stat, statData]);

    return (
        <div className="table-wrapper">
            <h2 className="table-title">{stat.toUpperCase()}</h2>
            {loading ? (
                <Spinner animation="border" role="status" variant="info" />
            ) : (
                <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    className="table-background"
                >
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>POSITION</th>
                            <th>TEAM</th>
                            <th>{stat.toUpperCase()}</th>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                </Table>
            )}
        </div>
    );
}

export default StatRankings;
