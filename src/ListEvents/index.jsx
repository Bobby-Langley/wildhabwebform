import { Col, Row, List } from "antd";
import {DeleteTwoTone, HeartTwoTone } from '@ant-design/icons'
import React, { useState, useEffect } from "react";


function deleteEvent(event, setResponseMessage){
  return(
  
  
  fetch("https://wildhab-api-a.web.app/events/" + event.id, {
    method: 'DELETE'})
    .then((result) => result.text())
    .then((data) => {
      data.statusCode < 300 ? setResponseMessage(data.message): console.log('error')
    })
    .catch((error) => console.log("error", error))
  

  )}

const addToFavorites = (event, favoritesList, setFavoritesList) => {
  const duplicateEvent =  favoritesList.some(favoriteEvent => event.id === favoriteEvent.id) 
  return duplicateEvent ? alert('Already in Favorites') : setFavoritesList((favorites) => favorites.concat(event))  
};

const removeFromFavorites = (favoriteEvent, favoritesList, setFavoriteEvents) => {
  const eventIndex = favoritesList.findIndex(event => event.id === favoriteEvent.id)
  const updatedFavoriteEvents = [...favoritesList]
  updatedFavoriteEvents.splice(eventIndex, 1)
  setFavoriteEvents(updatedFavoriteEvents)
}


const ListEvents = () => {
  const [eventsList, setEventsList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    //api call GetEvents
    fetch("https://wildhab-api-a.web.app/events")
      .then((result) => result.json())
      .then((data) => setEventsList(data.data))
      .catch((error) => console.log("error", error));
  }, []);

  console.log({ favoritesList });
  return (
    <>
      <Row justify="space-around">
        <Col>
          <List
            header={<div> Wildhab Events </div>}
            dataSource={eventsList}
            renderItem={(event) => 
              <List.Item
                key={event.id}
                actions={[
                  <a key="add-to-favorites"
                    onClick={() => addToFavorites(event, favoritesList, setFavoritesList)}> <HeartTwoTone twoToneColor="#eb2f96" /> </a>
                 
                ]}          
              >
                {event.eventName || event.name} {event.sport} Duration: {event.eventDuration}
              </List.Item>
              
             }
             
             
          />
        
        </Col>
            
        
        <Col>
          <List
            header={<div> Delete Events </div>}
            dataSource={eventsList}
            renderItem={(event) => 
              <List.Item
                key={event.id}
                actions={[
                  <a key="Delete-Event"
                    onClick={() => deleteEvent( event, eventsList)} > <DeleteTwoTone /> </a>
                 
                ]}          
              >
                {event.eventName || event.name} {event.sport} Duration: {event.eventDuration}
              </List.Item>
              
             }
             
             
          />
        
        </Col>
        
        <Col>
                <List
                    header= {<div> Favorite Events </div>}
                    dataSource={favoritesList}
                    renderItem= {favoriteEvent => 
                      <List.Item
                      key={favoriteEvent.id} 
                      
                          actions={[
                        <a key="remove-from-favorites" onClick={() => removeFromFavorites(favoriteEvent, favoritesList, setFavoritesList)}>
                          <DeleteTwoTone />
                        </a>
                    ]}
                  >
                        {favoriteEvent.eventName || favoriteEvent.name} {favoriteEvent.sport} Duration:
                {favoriteEvent.eventDuration}
                      </List.Item>
                    }
                />
            
        </Col>
      
      </Row>
    </>
  )
};

export default ListEvents;
