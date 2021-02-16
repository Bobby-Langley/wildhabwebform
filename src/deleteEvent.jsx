// import React, {useEffect} from "react"

// function DeleteEvent(event, setResponseMessage){
//     return(
//     useEffect(()=> {
    
//     fetch("https://wildhab-api-a.web.app/events/" + event.id, {
//       method: "Delete"})
//       .then((result) => result.text())
//       .then((data) => {
//         data.statusCode < 300 ? setResponseMessage(data.message): console.log('error')
//       })
//       .catch((error) => console.log("error", error))
    
//     }, )
//     )}


// export default DeleteEvent;