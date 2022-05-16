import Button from "../ui/button";
import DateIcon from '../../icons/date-icon';
import AddressIcon from '../../icons/address-icon';
import ArrowRightIcon from '../../icons/arrow-right-icon';
import styles from './event-item.module.css';
import Image from "next/image";
function EventItem(props)
{

    const {title,image,date,location,id} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US',{
        day:'numeric',
        month:'long',
        year: "numeric"
    });

    const formattedAddress = location.replace(',', '\n')
    const exploreLink = `/events/${id}`;

    return( 
    <li className={styles.item}>
        <Image src={'/images/'+image} alt={image} width={250} height={160}/>
        <div className={styles.content}>
            <div className={styles.summary}>
            <h2>{title}</h2>
            <div className={styles.date}>
                <DateIcon />
                <time>{humanReadableDate}</time>
            </div>
            <div className={styles.address}>
                <AddressIcon />
                <address>{formattedAddress}</address>
            </div>
            </div>
        </div>
        <div className={styles.actions}>
            <Button link={exploreLink}>                
                <span>Explore Event</span>
                <span className={styles.icon}><ArrowRightIcon /></span>
                </Button>
        </div>
    </li>)
}

export default EventItem;

