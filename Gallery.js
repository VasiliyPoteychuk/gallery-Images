import {useEffect, useState} from "react";
import Modal from "./Modal";
import './style.css';
export default function Gallery()
{
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState(false);
    const  [selectedPage, setSelectedPage] = useState(1)
    const [quantityImages, setQuantityImages] = useState(10)
    const [popularImage, setPopularImage] = useState('latest')
    const [sizeImage, setSizeImage] = useState('thumb')

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://api.unsplash.com/photos?page=${selectedPage}&per_page=${quantityImages}&order_by=${popularImage}&query=office`, {
                headers: {
                    'Authorization' : 'Client-ID t5NOAdtrJsUVbfNVyZzWq4gNWiddhR1jBriDhohqgjE',
                },
            })
            const json = await  response.json();
             setPhotos(json)
        })()
    }, [ quantityImages, selectedPage, popularImage])


    function updateSelected(index){
        const currentIndex = photos.findIndex(img => img.id === selected.id);
        if(currentIndex+index < 0){
            setSelected(photos[photos.length-1]);
        } else if(currentIndex + index >= photos.length){
            setSelected(photos[0]);
        }else {
            setSelected(photos[currentIndex+index])
        }
    }

    function changePage(pageNumber) {
        if (pageNumber <=0) {
            setSelectedPage(1)
        }else{
            setSelectedPage(pageNumber)
        } 
    }

    return (<div className="gallery">
        
        <form className="controlForm">
            <label htmlFor='selectPage'>Страница: </label>
                <input id="selectPage" type='number' value={selectedPage} onChange={(e)=>changePage(e.target.value)}></input>
            <label htmlFor='selectQuantity'>Кол-во картинок: </label>
                <input id="selectQuantity" type='number' value={quantityImages} onChange={(e)=>setQuantityImages(e.target.value)}></input>
            <label htmlFor='selectPopular'>По популярности: </label>
                <select id='selectPopular' onChange={(e)=> setPopularImage(e.target.value)}>
                    <option value='latest'>последние</option>
                    <option value='popular'>популярные</option>
                    <option value='oldest'>старые</option>
                </select>
            <label htmlFor='selectWidth'>Размер картинки: </label>
                <select id='selectWidth' onChange={(e)=> setSizeImage(e.target.value)}>
                    <option value='thumb'>200</option>
                    <option value='small'>400</option>
                    <option value='regular'>1080</option>
                </select>
        </form>

        {photos.map(photo => <img
            onClick={()=> setSelected(photo)}
            key={photo.id}
            src={photo.urls[sizeImage]}
            alt={photo.alt_description}/>)}
        {selected && <Modal image={selected} onNavigate={(index)=> updateSelected(index)} onClose={() => setSelected(false)}/>}
    </div>)
}