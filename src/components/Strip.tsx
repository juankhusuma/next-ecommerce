import { PiBriefcaseMetal } from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { RxCalendar } from 'react-icons/rx';

export default function Strip() {
    return (
        <section className="strip">
            <div>
                <PiBriefcaseMetal className="icon" />
                <p>Meny</p>
            </div>
            <div>
                <IoPricetagsOutline className="icon" />
                <p>Nyheter</p>
            </div>
            <div>
                <RxCalendar className="icon" />
                <p>Kommer opp</p>
            </div>
        </section>
    )
}