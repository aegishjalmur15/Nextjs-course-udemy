import { Fragment } from 'react';
import {getEventById, getFeaturedEvents} from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistic from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventsDetailPage(props)
{
    const {selectedEvent} = props

    if(!selectedEvent){
        return <ErrorAlert><p>No Event Found!</p></ErrorAlert>
    }

    return (
    <Fragment>
        <EventSummary title={selectedEvent.title} />
        <EventLogistic date={selectedEvent.date} address={selectedEvent.location}
        image={selectedEvent.image} imageAlt={selectedEvent.title}/>
        <EventContent>
            <p>{selectedEvent.description}</p>
        </EventContent>
    </Fragment>
    );
}

export async function getStaticProps(context){
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return{
        props:{
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths(){
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({params:{eventId: event.id}}));

    return {
        paths: paths,
        fallback:'blocking'
    }
}



export default EventsDetailPage;