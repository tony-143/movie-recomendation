import React, { useEffect, useState } from 'react'
import NavBar from '../Home/NavBar'
import { getMovieDetails, getWatchlistMovies } from '../auth/auth'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import Notification from '../components/Notfification'
import Footer from '../components/Footer'

const WatchListPage = () => {
    const [watchlistMovies, setWatchlistMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [notLogin,setNotLogin] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    }

    useEffect(() => {
        try {
            const result = getWatchlistMovies()
            result.then(async result => {
                const moviesList = []
                const promises = result.success.watchlist.map(title => {
                    return getMovieDetails(title.title).then(result => {
                        moviesList.push({ name: title.title, poster: result.Poster })
                    })
                        .catch(error => {console.log(error); handleClose()})
                })
                await Promise.all(promises)
                setWatchlistMovies(moviesList)
                setLoading(false)
                setNotLogin(false)
            })
                .catch(err => {
                    console.log(err)
                    setNotLogin(true)
                    setLoading(false)
                })
        }
        catch (e) {
            console.log(e)
            setLoading(false)
        }

    }, [])

 
    return (
        <>
            <NavBar />
            <div style={{minHeight:'68vh'}} className="ms-sm-5 me-3 ms-3 me-sm-5">
                <div className="mt-5">
                    <h2>Your Watchlist</h2>
                    {
                        loading ? <Loading /> :
                            <div className="mt-5 row text-light">
                                {
                                    watchlistMovies.length > 0 ?
                                        watchlistMovies.map((title, i) => {
                                            return <div key={i} className="col-lg-2 col-sm-4 col-6">
                                                <MovieCard title={title.name}
                                                    imageUrl={title.poster}
                                                />

                                            </div>
                                        })
                                        :
                                        <div className="text-center"> {notLogin ? 'please login to see watchlist' : 'You have no Watchlist '} </div>
                                }
                            </div>


                    }

                </div>
            </div>
            <Notification open={open} message="Network error: Please check your internet connection." onClose={handleClose} />

            <Footer />

        </>
    )
}

export default WatchListPage