import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { formatArrayEvents, getAllEvents } from "../../helpers/api-utils";

function AllEventsPage(props) {
  const [events, setEvents] = useState(props.events);

  const fetcher = async (url) => {
    const data  = await fetch(url);
    return formatArrayEvents(data.json());
  }
  const { data, error } = useSWR(
    "https://dummy-backend-bfc5c-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
    getAllEvents().then(e=>{
        setEvents(e);
      });
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
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
  };
}

export default AllEventsPage;
