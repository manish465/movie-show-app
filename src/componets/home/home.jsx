import React, { Component } from "react";

import "./home.css";

import {
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE,
    API_URL
} from "../../config";

import Heroimage from "../element/heroimage/heroimage";
import SeachBar from "../element/searchBar/searchBar";
import FourColGrid from "../element/fourColGrid/fourColGrid";
import MovieThumb from "../element/movieThumb/movieThumb";
import LoadMoreButton from "../element/loadMoreButton/loadMoreButton";
import Spinner from "../element/spinner/spinner";

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        isLoading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerms: ""
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-Us&page=1`;
        this.fetchItems(endpoint);
    }

    fetchItems = endpoint => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    movies: [...this.state.movies, ...result.results],
                    heroImage: this.state.heroImage || result.results[0],
                    isLoading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                });
            });
    };

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
