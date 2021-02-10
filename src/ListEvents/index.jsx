import { Col, Row, List } from "antd";

import React, { useState, useEffect } from "react";

const addToFavorites = (id) => {
    console.log('button clicked', id)
}

const ListEvents = () => {
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    //api call GetEvents
    fetch("https://wildhab-api-a.web.app/events")
      .then((result) => result.json())
      .then((data) => setEventsList(data.data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Row justify="space-around">
        <Col xs={24} sm={10}>
          <h1 style={{ textAlign: "center" }}>Hello List Events</h1>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col>
          <List
            dataSource={eventsList}
            renderItem={(event) => (
              <List.Item
                key={event.id}
                actions={[<a key="add-to-favorites" onClick={addToFavorites.bind(undefined, event.id)}>Add to favorites</a>]}
              >
                {event.eventName || event.name} {event.sport} Duration:
                {event.eventDuration}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default ListEvents;
