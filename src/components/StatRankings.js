import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import "./StatRankings.css";

function StatRankings(props) {
    // ensure we always get a lowercase stat for the api and table
    const stat = props.stat.toLowerCase();
    const [statData, setStatData] = useState([]);
    const [tableData, setTableData] = useState(null);

    // get data from api on first render
    useEffect(() => {
        const getStatLeaders = () => {
            const host = "https://api.nhle.com";
            const path =
                "/stats/rest/en/leaders/skaters/" +
                stat +
                "?cayenneExp=season=20222023%20and%20gameType=3";

            fetch(
                `https://api.allorigins.win/get?url=${encodeURIComponent(
                    host + path
                )}`
            )
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error("Network response was not ok.");
                })
                .then((data) => {
                    const newStatData = JSON.parse(data.contents);
                    setStatData(newStatData.data);
                });
        };
        getStatLeaders();
    }, [stat]);

    // update table data when the api is pulled
    // cant be dynamic since the key is different for each stat
    useEffect(() => {
        if (stat === "goals") {
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
                <tbody>
                    {tableData ? (
                        tableData
                    ) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default StatRankings;
