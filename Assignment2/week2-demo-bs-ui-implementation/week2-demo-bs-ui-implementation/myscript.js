        // Custom JS - included beneath Bootstrap
        function populatePostsTable(userId = null) {
            let url = +userId // attempt to convert userId to a number
                ? `https://jsonplaceholder.typicode.com/posts?userId=${+userId}`
                : `https://jsonplaceholder.typicode.com/posts`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);

                    let postRows = `
                        ${data.map(post => (
                            `<tr data-id=${post.id}>
                                <td>${post.userId}</td>
                                <td>${post.title}</td>
                                <td>${post.body}</td>
                            </tr>`
                        )).join('')}
                        `;

                    document.querySelector('#postsTable tbody').innerHTML = postRows;


                    // add the "click" event listener to the newly created rows
                    document.querySelectorAll('#postsTable tbody tr').forEach((row) => {
                        row.addEventListener('click', (e) => {
                            let clickedId = row.getAttribute('data-id');
                            console.log(clickedId);

                            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${clickedId}`)
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                let commentsList = `
                                    <ul class="list-group">
                                        ${data.map(comment => (`
                                        <li class="list-group-item">
                                            ${comment.body}<br /><br />
                                            <strong>Name:</strong> ${comment.name}<br />
                                            <strong>Email:</strong> ${comment.email}<br />
                                        </li>
                                        `)).join('')}
                                    </ul>
                                    `;

                                document.querySelector('#commentsModal .modal-body').innerHTML = commentsList;

                                let modal = new bootstrap.Modal(document.getElementById('commentsModal'), {
                                    backdrop: 'static',
                                    keyboard: false,
                                });

                                modal.show();
                            });
                        });
                    });
                });
        }

        // Execute when the DOM is 'ready'
        document.addEventListener('DOMContentLoaded', function () {
            populatePostsTable();
            // populatePostsTable(4); // test with User ID 4 (to be removed after testing)
      
            document.querySelector('#searchForm').addEventListener('submit', (event) => {
                // prevent the form from from 'officially' submitting
                event.preventDefault();

                // populate the posts table with the userId value
                 populatePostsTable(document.querySelector('#userId').value);
            });
        });
