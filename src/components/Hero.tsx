import Carousel from 'react-bootstrap/Carousel';


export default function Home() {
    return (
        <header className='hero'>
            <section className='hero__text'>
                <div>
                    <h1>Velkommen til</h1>
                    <h1>FruBlom</h1>
                    <h2>kafé og butikk</h2>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                    eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                    pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                    aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                    vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
                    dapibus.
                </p>
            </section>
            <section className='hero__carousel'>
                <Carousel>
                    <Carousel.Item>
                        <img src="/img/carousel/1.jpg" alt="1st slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/2.jpg" alt="2nd slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/3.jpg" alt="3rd slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/4.jpg" alt="4th slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/5.jpg" alt="5th slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/6.jpg" alt="6th slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/img/carousel/7.jpg" alt="7th slide" />
                    </Carousel.Item>
                </Carousel>
            </section>
        </header>
    )
}