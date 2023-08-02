import Link from "next/link";
import { Card } from 'react-bootstrap';
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";

export function getStaticProps() {
    return new Promise((resolve, reject) => {
        fetch('https://real-rose-cobra-sock.cyclic.app/api/movies/573a139af29313caabcf0859')
            .then(res => res.json())
            .then(data => {
                resolve({ props: { movie: data } })
            })
    })
}

export default function About(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <PageHeader text="About the Developer: Travis Liu" />
                </Card.Body>
                <p>As a software developer, I am passionate about creating innovative solutions that solve real-world problems.
                    I am dedicated to continuous learning, and I strive to stay up-to-date with the latest trends and technologies in the industry.
                    I have experience in a range of programming languages, including Java, Python, and JavaScript, and
                    I am always eager to expand my skill set.</p>
                <p>My approach to software development is collaborative and focused on the end-user. I believe that great software should be intuitive, user-friendly, and
                    tailored to the needs of its intended audience. In my work, I prioritize clear communication and thorough testing to ensure that my solutions meet or
                    exceed client expectations.</p>
                <p>Outside of my work, I enjoy exploring new technologies and experimenting with different programming languages.
                    I am always eager to learn and improve my skills, whether through online courses, conferences, or personal projects.
                    I believe that the best developers are those who are never satisfied with their current level of knowledge and are always striving for more.</p>
                <p>Ultimately, my goal as a software developer is to create software that is useful, intuitive, and enjoyable to use. I am committed to providing the
                    highest level of quality and service to my clients, and I look forward to working with you to bring your ideas to life.</p>
                <MovieDetails movie={props.movie} />
            </Card>
        </>
    );
}