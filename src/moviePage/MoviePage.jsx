import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPredictedMovies, getAllMovies, addMovieWatchlist, getWatchlistMovies, delWatchlistMovies, getMovieDetails } from '../auth/auth'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../Home/NavBar'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { setMoviesData } from '../store/actions'
import Button from "@mui/material/Button";
import YouTubeTrailer from '../components/YoutubeTrile'


const MoviePage = () => {
    const { title } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)
    const [Watchlist, setWatchlist] = useState(true)
    const [button, setButton] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const moviesData = useSelector(state => state.data)
    const [loadingMovies,setLoadingMovies] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [movieData, setMovieData] = useState({})

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await getAllMovies();
                // console.log(title)
                const result = await getMovieDetails(title)
                // console.log(result)
                dispatch(setMoviesData(response.data));

                setMovieData(result); // Update state with found movie data
                setLoading1(false);
            } catch (error) {
                console.log(error);
                setLoading1(false);
            }
        };

        const fetchPredictedMovies = async () => {
            try {
                const result = await getPredictedMovies(title);
                const moviesList = []
                const promises = result.name.map(name => {
                    return getMovieDetails(name).then(res => {
                        moviesList.push({ name: name, poster: res.Poster })
                    })
                        .catch(e => console.log(e))
                })

                await Promise.all(promises)

                setData(moviesList);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error(err);
            }
        };

        const checkWatchlist = async () => {
            setButton(true)
            try {
                const result = getWatchlistMovies()
                result.then(result => {
                    const res = result.success.watchlist.filter(movie => {
                        return movie.title.toLowerCase() == title.toLowerCase();
                    })
                    if (res.length > 0) {
                        setWatchlist(false)
                    }
                    else {
                        setWatchlist(true)
                    }
                })
                    .catch(err => {
                        console.log(err)
                    })
            }
            catch (e) {
                console.log(e)
            }
            setButton(false)
        }

        fetchMovieData();
        checkWatchlist()
        setLoadingMovies(!loadingMovies)
        fetchPredictedMovies();
        setLoadingMovies(!loadingMovies)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [title, dispatch]);



    const handleClick = async () => {
        setLoadingBtn(!loadingBtn)
        if (!localStorage.getItem('access_token')) {
            alert('please login');
            navigate('/login')
        }
        try {
            if (Watchlist) {
                const result = await addMovieWatchlist(title)
                if (result.success) {
                    setWatchlist(false)
                }
            }
            else {
                const result = await delWatchlistMovies(title)
                if (result.success) {
                    setWatchlist(true)
                }
            }
        }
        catch (err) {
            console.error(err);
        }

        setLoadingBtn(!loadingBtn)
    };

    if (loading || loading1) {
        return <Loading />
    }
// console.log(loadingMovies)
    return (
        <>
            <NavBar />

            <div className="me-sm-5 me-3 ms-3 ms-sm-3 mt-5 overflow-hidden">
                <div className="d-flex flex-column w-100 pt-5 justify-items-center">
                    <div className="row">


                        <div className="col-xl-2 col-md-4 col-sm-4 col-lg-3">
                            <img className="img-fluid m-2" style={{ height: '25rem', width: '20rem', objectFit: 'cover' }} src={`${movieData['Poster']}`} alt="" />
                        </div>


                        <div style={{ objectFit: 'cover' }} className="mt-1 col-md-7 col-sm-8 col-lg-8 col-xl-10 d-flex flex-column gap-">

                            <h2 className="card-title fs-1 text-truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {movieData['Title']}
                            </h2>

                            <div className='d-flex gap-2'>
                                <p className="fs-bold">Relised:</p>
                                <p className="fw-lighter"> {movieData['Released']}</p>
                            </div>

                            <p className='text-truncate' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movieData['Genre']}</p>

                            <div >
                                <span className='d-flex gap-2 align-items-center'><i className="fa-solid fs-lighter fa-user"></i>Cast :</span>
                                <p className='fw-lighter'
                                    style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 3,
                                        whiteSpace: 'normal',
                                        lineHeight: '1.2em'
                                    }}

                                >{movieData['Actors']}</p>
                            </div>

                            <div className='d-flex gap-2'>
                                <p className="fs-bold">Director:</p>
                                <p className="fw-lighter overflow-hidden text-ellipsis me-2"> {movieData['Writer']}</p>
                            </div>

                            <div className='d-flex gap-2'>
                                <p className="fs-bold">Box Office:</p>
                                <p className="fw-lighter overflow-hidden text-ellipsis me-2"> {movieData['BoxOffice']}</p>
                            </div>

                            <div className='d-flex gap-2'>
                                <p className="fs-bold">Duration:</p>
                                <p className="fw-lighter overflow-hidden text-ellipsis me-2"> {Math.floor(parseInt(movieData['Runtime']) / 60) + 'h' + ' ' + parseInt(movieData['Runtime']) % 60 + 'min'}</p>
                            </div>

                            <div className='d-flex gap-2'>
                                <p className="fs-bold">IMBD Rating:</p>
                                <p className="fw-lighter overflow-hidden text-ellipsis me-2"> {movieData['Ratings'][0] ? movieData['Ratings'][0].Value.split('/')[0] : ""} </p>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className='d-flex mt-2 gap-2'>
                                    <p className="fs-bold">Languages:</p>
                                    <p className="fw-lighter"> {movieData['Language']}</p>
                                </div>

                                <div className=' '>
                                    {
                                        Watchlist ?
                                            <Button onClick={handleClick} variant="outlined" 
                                            style={{ backgroundColor: 'yellow', scale: '0.9', color: 'black' }} className='fw-bold' > 
                                            {/* {loadingBtn ? "wait." : */}
                                            <div> <i className="fa-solid me-1 fa-plus"></i>add to watchlist</div></Button> :
                                            <Button onClick={handleClick} variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} className='fw-bold shadow p-2' ><i className="fa-solid me-1  fa-check"></i> Added</Button>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='m-2'>
                        <h5>Overview :</h5>
                        <p>{movieData['Plot']}</p>
                    </div>
                    <YouTubeTrailer movieTitle={title} />
                </div>

                <div className=" mt-4 d-flex justify-content-center flex-column">
                    <h4 className='text-left'>Movies</h4>

                    <div className="row">
                        {data.map((title, i) => (
                            <div key={i} className="col-6 col-sm-4 col-md-4 col-lg-2 mb-4" >
                                <MovieCard
                                    title={title.name}
                                    imageUrl={`${title.poster}`}
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </div >

        </>
    )
}

export default MoviePage