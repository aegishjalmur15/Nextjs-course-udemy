import { getFeaturedEvents } from '../helpers/api-utils'
import EventList from '../components/events/event-list';
import NewsLetterRegistration from '../components/input/newsletter-registration';

function HomePage(props)
{

    const featuredEvents = props.featuredEvents;

    return <div>
        <NewsLetterRegistration />
        <EventList items={featuredEvents}/>
    </div>
}

export async function getStaticProps(){

    const featuredEvents = await getFeaturedEvents();

    return {
        props:{
            featuredEvents: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;