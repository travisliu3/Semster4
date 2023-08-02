import { searchHistoryAtom } from '../store';
import { useAtom } from 'jotai';
import styles from '@/styles/History.module.css';
import { Card, ListGroup, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const router = useRouter();

    function history(e, index) {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    function remove(e, index) {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });

    }

    return (
        <>
            {parsedHistory.length ? (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                            key={index}
                            onClick={e => history(e, index)}
                            className={styles.historyListItem}
                        >
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button
                                className="float-end"
                                variant="danger"
                                size="sm"
                                onClick={e => remove(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try searching for some artwork.
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </>
    );

}