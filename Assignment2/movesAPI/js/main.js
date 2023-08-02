/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____Travis Liu____ Student ID: ____156740201____ Date: ____24 January, 2023____
*
********************************************************************************/
var page = 1;
const perPage = 10;

function loadMovieData(title = null) {

    let url = title
        ? `https://drab-blue-turkey-fez.cyclic.app/api/movies?page=${+page}&perPage=${+perPage}&title=${title}`
        : `https://drab-blue-turkey-fez.cyclic.app/api/movies?page=${+page}&perPage=${+perPage}`;

    var ul = document.querySelector(".pagination");

    if (title) {
        ul.classList.add("d-none");
    }
    else {
        ul.classList.remove("d-none");
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            let postRows = `
            ${data.map(post => (
                `<tr data-id=${post._id}>
                <td>${post.year}</td>
                <td>${post.title}</td>
                <td>${post.plot ? `${post.plot}` : 'N/A'}</td>
                <td>${post.rated ? `${post.rated}` : 'N/A'}</td>
                <td>${Math.floor(post.runtime / 60)}:${(post.runtime % 60).toString().padStart(2, '0')}</td>
                </tr>`
            )).join('')}
            `;

            document.querySelector('tbody').innerHTML = postRows;
            document.querySelector('#current-page').innerHTML = page;

            document.querySelectorAll('tbody tr').forEach((row) => {

                row.addEventListener('click', (e) => {

                    let clickedId = row.getAttribute('data-id');
                    fetch(`https://drab-blue-turkey-fez.cyclic.app/api/movies/${clickedId}`)
                        .then((res) => res.json())
                        .then((data) => {

                            document.querySelector('#detailsModal .modal-title').innerHTML = data.title;

                            let modaldata = "";
                            if (data.poster) {
                                modaldata = `
                            <img class="img-fluid w-100" src="${data.poster}"><br><br>
                            <strong>Directed By:</strong> ${data.directors.join()}<br><br>
                            <p>${data.fullplot}</p>
                            <strong>Cast:</strong> ${data.cast ? `${data.cast}` : 'N/A'}<br><br>
                            <strong>Awards:</strong> ${data.awards.text}<br>
                            <strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)
                            `;
                            }
                            else {
                                modaldata = `
                                <strong>Directed By:</strong> ${data.directors.join()}<br><br>
                                <p>${data.fullplot}</p>
                                <strong>Cast:</strong> ${data.cast ? `${data.cast}` : 'N/A'}<br><br>
                                <strong>Awards:</strong> ${data.awards.text}<br>
                                <strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)
                                `;
                            }

                            document.querySelector('#detailsModal .modal-body').innerHTML = modaldata;

                            let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                                backdrop: 'static',
                                keyboard: false,
                            });

                            modal.show();

                        });

                });

            });

        });

}

document.addEventListener('DOMContentLoaded', function () {
    loadMovieData();

    document.querySelector('#searchForm').addEventListener('submit', (event) => {
        event.preventDefault();

        loadMovieData(document.querySelector('#title').value);
    });

    document.querySelector('#previous-page').addEventListener('click', () => {
        if (page > 1) {
            page--;
            loadMovieData();
        }
    });

    document.querySelector('#next-page').addEventListener('click', () => {
        if (page >= 1) {
            page++;
            loadMovieData();
        }
    });

    document.querySelector('#clearForm').addEventListener('click', () => {
        document.querySelector('#title').value = "";
        loadMovieData();
    });

});