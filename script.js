// document.addEventListener('keydown', (event) => {
//     let name = event.key;
//     let code = event.code;
// }, false);

const sBtn = document.querySelector('.search-btn');
sBtn.addEventListener('click', async function () {
    const inputKey = document.querySelector('.input-key'),
        filmKey = await getMovies(inputKey.value);
    // console.log(film);
    updateUiCard(filmKey);
});

function getMovies(key) {
    return fetch('http://www.omdbapi.com/?apikey=d6259be9&s=' + key)
        .then(Response => Response.json())
        .then(Response => Response.Search);
}


function updateUiCard(f) {
    let cards = '';
    f.forEach(mvs => cards += cardFilm(mvs));
    const containerFlm = document.querySelector('.containerFilm');
    containerFlm.innerHTML = cards;
}



// event  binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-detail')) {
        const mvsDetail = e.target.dataset.imdbid,
            getDetail = await getMoviesDetail(mvsDetail);
        updateMvsDetail(getDetail);
    }
});

function getMoviesDetail(key) {
    return fetch('http://www.omdbapi.com/?apikey=d6259be9&i=' + key)
        .then(Response => Response.json())
        .then(mov => mov);
}

function updateMvsDetail(mov) {
    const mvsDtl = showDetailFilm(mov),
        modalDetail = document.querySelector('.modal-body');
    modalDetail.innerHTML = mvsDtl;
};


function cardFilm(m) {
    return ` <div class="card col-3 offset-1 my-3 p-2">
                    <img src = "${m.Poster}" class = "card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary btn-detail" data-bs-toggle="modal"
                            data-bs-target="#Modaldetail" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>`;
};


function showDetailFilm(detail) {
    return `<div class="contaier-fluid">
                <div class="row">
                    <div class="col-md-5">
                        <img src="${detail.Poster}" class="img-fluid">
                    </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <h5><strong>Judul :</strong></h5> ${detail.Title}
                        </li>
                        <li class="list-group-item"><strong>Director :</strong> ${detail.Director}</li>
                        <li class="list-group-item"><strong>Writer :</strong> ${detail.Writer}</li>
                        <li class="list-group-item"><strong>Actors :</strong> ${detail.Actors}</li>
                        <li class="list-group-item"><strong>Plot :</strong> ${detail.Plot}</li>
                    </ul>
                </div>
            </div>
             <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-modal-detail" data-bs-dismiss="modal">Close</button>
            </div>`;
};