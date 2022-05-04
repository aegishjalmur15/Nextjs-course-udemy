import {useRouter } from 'next/router';
import { getFilteredEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';

function FilteredEventsPage(){

    const routeArgs = useRouter();

    const filterAgrs = routeArgs.query.slug;

    const year= +filterAgrs[0];
    const month = filterAgrs[1];

    const filteredEvents = getFilteredEvents({year,month});

    if(!filterAgrs)
    {
        return <p className='center'>Loading...</p>
    }

    

    return <div>
        <EventList items={filteredEvents}/>
    </div>
}

export default FilteredEventsPage;