import React from 'react'
import { Card } from 'react-bootstrap';

function ErrorBox({errorMessage}) {
    return (
        <Card bg={'dark'} text={'white'}>
            <Card.Body>
                <Card.Title>
                    Something has gone wrong!
                </Card.Title>
                <Card.Text>
                    sorry, it seems something has gone wrong
                    Please try again, but if it keeps happening
                    please contact the admin and let them know
                    the error is:
                </Card.Text>
                <Card.Footer>
                    {errorMessage}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

export default ErrorBox