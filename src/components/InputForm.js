import React, {useState, useEffect} from 'react';
import {Form, Row, Col, InputGroup, Button} from 'react-bootstrap';

const WAIT_INTERVAL = 1000;
const TAB_KEY = 9;

const InputForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState({});
    const [coordinates, setCoordinates] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isOngoing, setIsOngoing] = useState(false);
    const [description, setDescription] = useState('');
    const [organization, setOrganization] = useState('');
    const [cost, setCost] = useState(null);
    const [pulishedDate, setPublishedDate] = useState(new Date().getDate());
    const [funding, setFunding] = useState(null);
    const [tag, setTag] = useState(null);
    const [contactPerson, setContactPerson] = useState({});
    const [projectURL, setProjectURL] = useState(null);

    let timer = null;

    const handleName = (event) => {
        clearTimeout(timer)
        timer = setTimeout((event) => {console.log(event.target.value)}, WAIT_INTERVAL);
    }

    return (
        <Form>
            <Form.Group controlId="projectName">
                <Form.Label>Project (Solution) Name</Form.Label>
                <Form.Control key="name"
                    type="text" 
                    placeholder="Industrial wastewater treatment"
                    onChange={(event) => {handleName(event)}} />
                <Form.Text className="text-muted">The name of your solution or project</Form.Text>
            </Form.Group>

            <Form.Group controlId="location">
                <Form.Label>Implemented location</Form.Label>
                <Form.Control key="location" as="select" >
                    <option>Finland</option>
                    <option>Sweden</option>
                    <option>Denmark</option>
                    <option>Poland</option>
                    <option>Germany</option>
                    <option>Estonia</option>
                    <option>Russia</option>
                    <option>Lativa</option>
                    <option>Lithuania</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="implementPeriod">
                <Form.Label>Implementation period</Form.Label>
                <Row>
                    <Col>
                        <Form.Control key="start-date" type="date" placeholder="20.01.2020"/>
                    </Col>
                    <Col> - </Col>
                    <Col>
                        <Form.Control key="end-date" type="date" placeholder="20.01.2020"/>
                    </Col>
                </Row>
                <Form.Check key="is-ongoing" type="checkbox" label="Ongoing" />   
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Describe your project</Form.Label>
                <Form.Control key="description" as="textarea" placeholder="Project description" rows="3" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="cost">
                    <Form.Label>Project's cost</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control key="cost" aria-label="Amount (to the nearest dollar)" />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="funding">
                    <Form.Label>Funding source</Form.Label>
                    <Form.Control key="funding" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="links">
                <Form.Label>Relevant links to project or solution</Form.Label>
                <Form.Control key="links" type="text" placeholder="https://www.google.com" />
            </Form.Group>
            
            <Form.Group controlId="tags">
                <Form.Label>Project's type and tags</Form.Label>
                <div key="custom-inline-switch" className="mb-3">
                    <Form.Check 
                        custom
                        inline
                        label="Practice"
                        type="switch"
                        id="1" 
                    />
                    <Form.Check 
                        custom
                        inline
                        label="Solution"
                        type="switch"
                        id="2" 
                    />
                    <Form.Check 
                        custom
                        inline
                        label="Tool"
                        type="switch"
                        id="3" 
                    />
                </div>
                <Form.Control key="tags" as="textarea" placeholder="phosphorus, sludge" />
                <Form.Text>Seperate each tag by comma</Form.Text>
            </Form.Group>

            <Form.Group controlId="contact-person">
                <Form.Label>Contact person</Form.Label>
                <Form.Row>
                    <Form.Group as={Col} controlId="contact-name">
                        <Form.Text>Name</Form.Text>
                        <Form.Control key="contact-name" type="text" placeholder="John Smith" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="contact-email">
                        <Form.Text>Email</Form.Text>
                        <Form.Control key="contact-email" type="text" placeholder="john@gmail.com" />
                    </Form.Group>
                </Form.Row>
            </Form.Group>

            <Button>Submit</Button>
        </Form>
    )
}

export default InputForm;