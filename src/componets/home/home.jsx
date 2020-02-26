import React, { Component } from "react";

import "./home.css";

import {
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE,
    API_URL,
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
        searchTerms: "",
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-Us&page=1`;
        this.fetchItems(endpoint);
    }

    LoadMoreItems = () => {
        let endpoint = "";
        this.setState({ isLoading: true });

        if (this.state.searchTerms === "") {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
                .state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&query${
                this.state.searchTerms
            }&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    };

    searchItems = searchTerms => {
        let endpoint = "";
        this.setState({
            movies: [],
            isLoading: true,
            searchTerms,
        });

        if (searchTerms === "") {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-Us&page=${this
                .state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerms}`;
        }
        this.fetchItems(endpoint);
    };

    fetchItems = endpoint => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    movies: [...this.state.movies, ...result.results],
                    heroImage: this.state.heroImage || result.results[1],
                    isLoading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages,
                });
            });
    };

    render() {
        return (
            <div className="rmdb-home">
                {this.state.heroImage ? (
                    <div>
                        <Heroimage
                            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                            title={this.state.heroImage.original_title}
                            text={this.state.heroImage.overview}
                        />
                        <SeachBar callback={this.searchItems} />
                    </div>
                ) : null}
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={
                            this.state.searchTerm
                                ? "Search Result"
                                : "Popular Movies"
                        }
                        loading={this.state.loading}
                    >
                        {this.state.movies.map((element, i) => {
                            return (
                                <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={
                                        element.poster_path
                                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                                            : "./images/no_image.jpg"
                                    }
                                    movieId={element.id}
                                    movieName={element.original_title}
                                />
                            );
                        })}
                    </FourColGrid>
                </div>
                <Spinner />
                <LoadMoreButton />
            </div>
        );
    }
}

export default Home;
