import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  if (props.hasErro) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterAgrs = params.slug;

  if (!filterAgrs) {
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
    return {
      props: {
        hasErro: true,
      },
    };
  }
  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents: filteredEvents,
      hasErro:false,
      date: {
        year,
        month,
      },
    },
  };
}

export default FilteredEventsPage;
