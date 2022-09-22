import ReactMapGL from 'react-map-gl';
import './Maping.css'
export default function Maping() {
    return (
        <div className='map-container'>
            <ReactMapGL mapboxApiAccessToken='pk.eyJ1IjoidGFudHJ1bmczdCIsImEiOiJjbDdwdDdjamcxNjlwM3hveXM2NHJoaGoyIn0.lsG8MoesaR-Ssyey5x54Rw'>
            </ReactMapGL>
        </div>
    )
}