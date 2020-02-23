import React, { Component } from "react";
import "./home.css";
import Heroimage from "../element/heroimage/heroimage";
import SeachBar from "../element/searchBar/searchBar";
import FourColGrid from "../element/fourColGrid/fourColGrid";
import MovieThumb from "../element/movieThumb/movieThumb";
import LoadMoreButton from "../element/loadMoreButton/loadMoreButton";
import Spinner from "../element/spinner/spinner";

class Home extends Component {
    state = {};
    render() {
        return (
            <div className="rmdb-home">
                <Heroimage />
                <SeachBar />
                <FourColGrid />
                <Spinner />
                <LoadMoreButton />
            </div>
        );
    }
}

export default Home;
