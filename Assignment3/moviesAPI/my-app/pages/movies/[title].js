import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieDetails from '../../components/MovieDetails';
import Error from 'next/error';
import PageHeader from '../../components/PageHeader';

export default function Movie() {
    const router = useRouter();
    const { title } = router.query;
    const { data, error } = useSWR(`https://real-rose-cobra-sock.cyclic.app/api/movies?page=1&perPage=10&title=${title}`);

    if (!data) {
        return null
    }
    else {
        if (data.length == 0) {
            return <Error statusCode={404} />;
        }
        else {
            return (
                <>
                    {data.map((movie, index) =>
                        <div eventKey={index} key={index}>
                            <strong><PageHeader text={movie.title} /></strong>
                            <MovieDetails movie={movie} />
                        </div>
                    )}
                </>
            )
        }
    }
}