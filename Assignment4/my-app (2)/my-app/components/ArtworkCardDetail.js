import useSWR from 'swr'
import Error from 'next/error'
import Link from "next/link"
import { Card } from 'react-bootstrap'

export default function ArtworkCardDetail(props) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`)

    if (error) {
        return <Error statusCode={404} />
    }

    if (data) {
        return (
            <>
                <Card>
                    <Card.Img variant="top" src={data.primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                    <Card.Body>
                        <Card.Title>{data.title || 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
                            <strong>Classification:</strong> {props.classification || 'N/A'}<br />
                            <strong>Medium:</strong> {data.medium || 'N/A'}
                            <br />
                            <br />
                            <div><strong>Artist:</strong> {data.artistDisplayName || 'N/A'}
                                {data.artistDisplayName && data.artistWikidata_URL && (
                                    <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" > (wiki)</a>
                                )}
                            </div>
                            <div>
                                <strong>Credit Line:</strong> {data.creditLine || 'N/A'}
                            </div>
                            <div>
                                <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else {
        return null;
    }

}