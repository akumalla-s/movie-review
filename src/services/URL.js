
const addMovieUrl = ()=>{
    return "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/movies"
}

const getAllMoviesUrl = ()=>{
    return 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/movies';
}

const findMovieUrl = ()=>{
    return `https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/movies`;
}

const updateMovieUrl = ()=>{
    return `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/movies`;
}

const deleteMovieUrl = ()=>{
    return `https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/movies`;
}
const findAllUsersUrl = ()=>{
    return "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users";
}

const createUserUrl = ()=>{
    return "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users";
}
const URL = {
    addMovieUrl,
    getAllMoviesUrl,
    findAllUsersUrl,
    createUserUrl,
    findMovieUrl,
    updateMovieUrl,
    deleteMovieUrl,
}

export default URL;
    