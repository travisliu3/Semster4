import React from 'react';
import { useAtom } from 'jotai';
import ArtworkCard from '../components/ArtworkCard';
import { favouritesAtom } from '../store';
import { Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    return (

        <Row className="gy-4">
            {favouritesList.length > 0 ? (
                favouritesList.map(currentObj => (
                    <Col lg={3} key={currentObj}>
                        <ArtworkCard objectID={currentObj} />
                    </Col>
                ))
            ) : (
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try searching for something else.
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>

    );
}