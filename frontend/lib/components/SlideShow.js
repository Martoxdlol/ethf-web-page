import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import { getStrapiURL } from '../api';



export default function Slideshow({ media }) {
    return (
        <div className="slide-container">
            <Slide>
                {media.map((element, index) => {
                    console.log(element)
                    if (element.mime.startsWith('video')) {
                        return <div className="each-slide" key={index}>
                            <div style={{ height: '300px', }}>
                                VIDEO
                            </div>
                        </div>
                    }

                    return <div className="each-slide" key={index}>
                        <div style={{ 'backgroundImage': `url(${element.url})`, height: '300px', backgroundSize: '100% auto', backgroundPosition: 'center' }}>
                            {/* <span>{slideImage.caption}</span> */}
                        </div>
                    </div>
                })}
            </Slide>
        </div>
    )
}