'use client'
import React, { useState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [20, 30],
});

type Latlng = [number, number]
type LocationMarkerProps = {
    position: Latlng | null;
    setPosition: (position: Latlng) => void
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
    const map = useMapEvents({
        click(e) {
            const newLocation: Latlng = [e.latlng.lat, e.latlng.lng]
            setPosition(newLocation)
            map.flyTo(e.latlng)
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}


const MapLandmark = ({ location }: { location?: { lat: number, lng: number } }) => {
    const defaultLocation: Latlng = [14, 100.5]
    const [position, setPosition] = useState<Latlng | null>(null)
    console.log(position);

    return (
        <>
            <h1 className='mt-4 font-semibold'>Where are you?</h1>
            <input type='hidden' name='lat' value={position ? position[0] : ''} />
            <input type='hidden' name='lng' value={position ? position[1] : ''} />
            <MapContainer className='h-[50vh] rounded-lg z-0 relative mb-2' center={location || defaultLocation} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <Marker position={location || defaultLocation} icon={markerIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                <LocationMarker position={position} setPosition={setPosition} />

                <LayersControl>
                    <LayersControl.BaseLayer name='Openstreetmap'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name='Stadia Satellite' checked>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>


            </MapContainer>
        </>
    )
}

export default MapLandmark
