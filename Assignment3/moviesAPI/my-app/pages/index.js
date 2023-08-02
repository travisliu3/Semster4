import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Accordion } from 'react-bootstrap';
import MovieDetails from '../components/MovieDetails';
import PageHeader from '../components/PageHeader';

export default function Home() {
  const [page, setpage] = useState(1);
  const [pageData, setpageData] = useState([]);
  const { data, error } = useSWR(`https://real-rose-cobra-sock.cyclic.app/api/movies?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) {
      setpageData(data);
    }
  }, [data]);

  function previous(e) {
    if (page > 1) {
      setpage(pagenum => pagenum - 1);
    }
  }
  function next(e) {
    setpage(pagenum => pagenum + 1);
  }

  return (
    <>

      <strong><PageHeader text="Film Collection : Sorted by Date" /></strong>

      <Accordion defaultActiveKey="0">
        {pageData.map((movie, index) =>
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header><strong>{movie.title}</strong>&nbsp;({movie.year}: Directed By {movie.directors.join(',')})</Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={movie} />
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  )
}
