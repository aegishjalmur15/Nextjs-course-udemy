import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { formatArrayEvents} from "../../helpers/api-utils";

function FilteredEventsPage() {
  const [events, setEvents] = useState();
  const router = useRouter();

  const filterAgrs = router.query.slug;
  const { data } = useSWR(
    "https://dummy-backend-bfc5c-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );
  

  useEffect(() => {
    if (data) {
      const events = formatArrayEvents(data);
      setEvents(events);
    }
  }, [data]);

  
  if (!events) {
    return <p className="center">Loading...</p>;
  }
  const year = +filterAgrs[0];
  const month = +filterAgrs[1];

  if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 1 ||
        month > 12
      ) {
        return <Fragment>
          <ErrorAlert>
            <p>Invalid filter. Please adjust your values!</p>
          </ErrorAlert>
          <div className="center">
            <Button link='/events'>Show all events</Button>
          </div>
        </Fragment> 
      }



  const filteredEvents = getFilteredEvents({ year, month }, events)
  

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  console.log(filteredEvents)
  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}


function getFilteredEvents(){
  const {year, month} = arguments[0];
  let allEvents;

  if(arguments.length ===2){
    allEvents = arguments[1]; 
  }
  let filteredEvents = allEvents.filter(event=>{
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month -1
  })
  return filteredEvents;
}


// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterAgrs = params.slug;

//   if (!filterAgrs) {
//     return <p className="center">Loading...</p>;
//   }
//   const year = +filterAgrs[0];
//   const month = +filterAgrs[1];

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: {
//         hasErro: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       hasErro:false,
//       date: {
//         year,
//         month,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
