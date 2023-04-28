import "./App.css";

import StatRankings from "./components/StatRankings";
import Chat from "./components/Chat";
import Footer from "./components/Footer";

import mcdavid from "./assets/connor-mcdavid.jpg";
import kane from "./assets/patrick-kane.jpg";

function App() {
    return (
        <div>
            <div className="app-wrapper">
                <h1 className="app-title">CONN SMYTHE TRACKER</h1>
                <p className="welcome-text">
                    Welcome to the Conn Smythe Tracker! This is a place to
                    present the most important skater stats during the course of
                    the playoffs, and to see if we can predict the eventual
                    winner of the Conn Smythe Trophy given to the playoffs MVP.
                    There is both a prediction from a machine learning model I
                    created, and also my personal prediction based on who I
                    think will win it. Join in on the chat and I hope you have
                    fun looking at some data! Data is gathered from the NHL api
                    that their website uses.
                </p>

                <section className="tables-section">
                    <StatRankings stat="goals" />
                    <StatRankings stat="assists" />
                    <StatRankings stat="points" />
                </section>
                <section>
                    <div className="prediction-wrapper">
                        <h2>MODEL PREDICTION: CONNOR MCDAVID</h2>
                        <p className="prediction-img">
                            <img src={mcdavid} alt="Connor Mcdavid" />
                        </p>
                        <p className="prediction-explanation">
                            The model predicted Connor McDavid to win the Conn
                            Smythe, most likely due to his historic regular
                            season where he led all players in goals, assists,
                            and points. However, I don't think the Oilers are
                            good enough to win it all, so I don't think he will
                            have the opportunity to win it since it's usually a
                            player from the winning team.
                        </p>
                    </div>

                    <div className="prediction-wrapper">
                        <h2>PERSONAL PREDICTION: PATRICK KANE</h2>
                        <p className="prediction-img">
                            <img src={kane} alt="Patrick Kane" />
                        </p>
                        <p className="prediction-explanation">
                            I believe Patrick Kane will win the Conn Smythe due
                            to the huge firepower the Rangers have, and his
                            chemistry with Artemi Panarin. Kane is going to be
                            fired up coming back to the playoffs after a long
                            time and will show why he's nicknamed "Showtime".
                        </p>
                    </div>
                </section>
                <Chat />
                <p className="disclaimer-text">
                    Note: This is just for fun! Some players will have more
                    opportunities for goals and assists due to playing more
                    games. That will inflate numbers, but hockey also has so
                    many intangibles that won't show up on the stat sheet.
                    According to this model and website, it'd be impossible for
                    a defensemen to win. If you play perfect defense it won't
                    look like you've done anything at all on the stat sheet! I
                    would love to see your predictions in the chat!
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default App;
