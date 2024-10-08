export const api = "http://127.0.0.1:8000/api";

const registration = async (userData) => {
  try {
    const response = await fetch(`${api}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error details", errorMessage)
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the registration request:", error);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await fetch(`${api}/login/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      const errorMessage = await response.json()
      console.error("Error Details", errorMessage)
      return false
    }
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      window.location.href = '/'
    }
    return await response.json()
  }
  catch (error) {
    console.error("There was an error in Login", error)

    return false
  }
}

export const getPredictedMovies = async (title) => {
  try {
    const response = await fetch(`${api}/movieslist/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: title })
    })

    if (!response.ok) {
      const errorMessage = await response.json()
      console.error("Error Details", errorMessage)
    }
    return await response.json()
  }
  catch (error) {
    console.error("There was an error to fetch movies", error)
  }
}

export const getAllMovies = async (title) => {
  try {
    const response = await fetch(`${api}/moviesdata/`)

    if (!response.ok) {
      const errorMessage = await response.json()
      console.error("Error Details", errorMessage)
    }
    return await response.json()
  }
  catch (error) {
    console.error("There was an error to fetch movies", error)
  }
}


async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await fetch(`${api}/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data.access;
  } else {
    console.error("Failed to refresh token", await response.json());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to login page
    window.location.href = '/login';
    return null;
  }
}


async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('access_token');

  if (!options.headers) {
    options.headers = {};
  }
  options.headers['Authorization'] = `Bearer ${accessToken}`;

  let response = await fetch(url, options);

  if (response.status === 401 && response.statusText === "Unauthorized") {
    accessToken = await refreshAccessToken();

    if (accessToken) {
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
  }

  return response;
}

export const addMovieWatchlist = async (title) => {
  try {
    const response = await fetchWithAuth(`${api}/watchlist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error Details", errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("There was an error to add", error);
  }
};
export const getWatchlistMovies = async () => {
  try {
    const response = await fetchWithAuth(`${api}/watchlist`)
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error Details", errorMessage);
    }
    return await response.json();
  }
  catch (error) {
    console.error("Error Details", error);
    throw error;
  }
}
export const delWatchlistMovies = async (title) => {
  try {
    const response = await fetchWithAuth(`${api}/watchlist/`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title})
    })

    if(!response.ok){
      const errorDetails = await response.json()
      console.error("Error Details", errorDetails)
    }
    return await response.json()
  }
  catch (error) {
    console.error("Error Details", error);
    throw error;
  }
}

export const getMovieDetails = async (title) => {
  try {
      const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=dfd6c928&t=${title}`);
      
      if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Error Details", errorDetails);
          throw new Error("Failed to fetch movie details");
      }

      return await response.json();
  } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.log("Network error: Please check your internet connection.");
      } else {
          console.error("Error Details", error);
      }
      throw error;  // Re-throw the error so it can be handled by the caller
  }
};






export default {
  registration,
  login,
};
