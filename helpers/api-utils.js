export async function getAllEvents(){
    const data = await (
      await fetch(
        "https://dummy-backend-bfc5c-default-rtdb.firebaseio.com/events.json"
      )
    ).json();
    return formatArrayEvents(data)
}

export async function getFeaturedEvents(){
    return (await getAllEvents()).filter(event=>event.isFeatured);
}

export async function getEventById(id)
{
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.id === id)[0]
}

export async function getFilteredEvents(dateFilter){
  const {year, month} = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter(event=>{
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month -1
  })

  return filteredEvents;
}

export function formatArrayEvents(data){
    const dataArray = [];
    for (const key in data) {
        dataArray.push({
          id: key,
          ...data[key]
        });
    }
    return dataArray;
}