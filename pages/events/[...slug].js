import {useRouter } from 'next/router';
import { getFilteredEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';
import { Fragment } from 'react';
import ResultsTitle from  '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErroAlert from '../../components/ui/error-alert';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(){

    const routeArgs = useRouter();

    const filterAgrs = routeArgs.query.slug;

    if(!filterAgrs)
    {
        return <p className='center'>Loading...</p>
    }
    const year= +filterAgrs[0];
    const month = filterAgrs[1];

    if(isNaN(year) ||
     isNaN(month) || 
     year > 2030 || year <2021 
     || month < 1 || month >12)
    {
        return <Fragment> 
        <ErrorAlert><p>Invalid filter. Please adjust your values</p></ErrorAlert>
        <div className='center'>
            <Button link='/events'>Show All Events</Button>
        </div>
        </Fragment>        
    }

    const filteredEvents = getFilteredEvents({year,month});


    if(!filteredEvents || filteredEvents.length ===0)
    {
        return  <Fragment>
        <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
        <div className='center'>
            <Button link='/events'>Show All Events</Button>
        </div>
        </Fragment>
    }

    const date = new Date(year,month -1);

    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents}/>
    </Fragment>
}

export default FilteredEventsPage;