import React, { useEffect, useMemo, useState } from 'react'
import NavBar from './NavBar';
import MovieCard from '../components/MovieCard';
import { useSelector, useDispatch } from 'react-redux'
import { setMoviesData } from '../store/actions';
import { api, getMovieDetails } from '../auth/auth';
import Loading from '../components/Loading';
import Notification from '../components/Notfification';
import Footer from '../components/Footer';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [pageNumber, setPageNumber] = useState(1)
    const moviesData = useSelector(state => state.data)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        fetch(`${api}/moviesdata/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(async data => {
                dispatch(setMoviesData(data.data))
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
                handleClick()
            });
            // setLoading(false)
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setMoviesLoading(true)
            const itemsPerPage = 20;
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            let moviesList = [];

            if (moviesData.names) {
                const paginatedMovies = moviesData.names.slice(startIndex, endIndex);

                if (paginatedMovies) {
                    const promises = paginatedMovies.map(async (title) => {
                        try {
                            const movie = await getMovieDetails(title);
                            moviesList.push({ name: title, poster: movie.Poster });
                        } catch (error) {
                            console.error(`Error fetching movie details for ${title}:`, error);
                            handleClick()
                        }
                    });

                    await Promise.all(promises); // Wait for all promises to resolve
                }
            }

            setData(moviesList);
            // setLoading(false);
            setMoviesLoading(false)
        };

        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [pageNumber, moviesData.names]);



    useEffect(() => {
        searchTerm ? setSearch(true) : setSearch(false);
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm) {
            fetchResults(debouncedTerm.toLowerCase());
        }
    }, [debouncedTerm]);

    const fetchResults = async (term) => {
        const results = moviesData.names.filter(name => {
            return name.toLowerCase().includes(term)
        })
        if (results.length > 0) {
            const list = []
            const promises = results.map((title) => {
                return getMovieDetails(title).then((details) => {
                    list.push({ name: title, poster: details.Poster })
                })
                    .catch((error) => { console.error(error) })
            })

            await Promise.all(promises)
            setSearchResults(list)
        }
    };


    return (
        <>
            <NavBar />

            <div style={{ minHeight: '71vh' }} className="me-sm-5 me-3 ms-3 ms-sm-5 mt-5 overflow-hidden">
                <div className="d-flex pt-5 justify-items-center">
                    <div className="position-relative w-75 mx-auto">
                        <input
                            style={{ outline: 'none' }}
                            type="text"
                            placeholder="enter movie name"
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value) }}
                            className="border p-2 w-100 rounded-pill fs-5 ps-3"
                        />
                        <i style={{ right: '10px' }} className="fa-solid p-2 text-dark fs-3 position-absolute fa-magnifying-glass"></i>
                    </div>
                </div>

                <div className=" mt-5 d-flex justify-content-center flex-column">
                    <h4 className='text-left'>{search ? "Results" : "Movies"}</h4>
                    {
                        loading ? <Loading /> : <>

                            {search ? <div>

                                <div className="row">
                                    {searchResults.map((title, i) => (
                                        <div key={i} className="col-6 col-sm-4 col-md-4 col-lg-2 mb-4" >
                                            <MovieCard
                                                title={title.name}
                                                imageUrl={`${title.poster}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div> : <div>

                                {
                                    moviesLoading ? <Loading /> :
                                        <div className="row">
                                            {data.map((title, i) => (
                                                <div key={i} className="col-6 col-sm-4 col-md-4 col-lg-2 mb-4" >
                                                    <MovieCard
                                                        title={title.name}
                                                        imageUrl={`${title.poster}`}
                                                    />
                                                </div>
                                            ))}


                                            <div className="d-flex justify-content-end">
                                                <div className="d-flex fs-3 mb-3 gap-2 justify-content-between">
                                                    <span style={{ cursor: 'pointer' }} onClick={() => { if (pageNumber > 1) setPageNumber(pageNumber - 1) }}>⬅️</span>
                                                    <span>{pageNumber}</span>
                                                    <span style={{ cursor: 'pointer' }} onClick={() => setPageNumber(pageNumber + 1)}>➡️</span>
                                                </div>
                                            </div>

                                        </div>
                                }


                            </div>}

                        </>}


                </div>
            </div>

            <Notification open={open} message="Network error: Please check your internet connection." onClose={handleClose} />
            <Footer />
        </>
    )
}

export default Home;
