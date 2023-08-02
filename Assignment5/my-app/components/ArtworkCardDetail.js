import useSWR from 'swr'
import Error from 'next/error'
import Link from "next/link"
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useState } from 'react';

export default function ArtworkCardDetail(props) {

    const [showAdded, setshowAdded] = useState(favourites.includes(props.objectID));
    const [favourites, setFavouritesList] = useAtom(favouritesAtom);
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    
    function favourites() {

        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav != props.objectID));
            setshowAdded(show => show = false);
        }
        if (!showAdded) {
            setFavouritesList(current => [...current, props.objectID]);
            setshowAdded(show => show = true);
        }
    }

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
                            <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favourites} >
                                + Favourite {showAdded ? '(added)' : ''}
                            </Button>
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