import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const [events, setEvents] = useState(props.events);

  const { data, error } = useSWR(
    "https://dummy-backend-bfc5c-default-rtdb.firebaseio.com/events.json",
    url => fetch(url).
    then(res => res.json())
  );
  
  useEffect(() => {
    if (data) {
      const dataArray = [];
      for (const key in data) {
        dataArray.push({
          id: key,
          date: data[key].date,
          description: data[key].description,
          isFeatured: data[key].isFeatured,
          localtion: data[key].location,
          title: data[key].title,
        });
      }
      setEvents(dataArray);
    }
  }, [data]);
  
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}/`;

    router.push(fullPath);
  }
  if (!events) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getServerSideProps() {
  const dataArray = [];
  fetch("https://dummy-backend-bfc5c-default-rtdb.firebaseio.com/events.json")
    .then((response) => response.json())
    .then((data) => {
      for (const key in data) {
        dataArray.push({
          id: key,
          date: data[key].date,
          description: data[key].description,
          isFeatured: data[key].isFeatured,
          localtion: data[key].location,
          title: data[key].title,
        });
      }
    });

  return {
    props: {
      events: dataArray,
    },
  };
}

export default AllEventsPage;
