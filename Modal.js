import closeIcon from './close.svg';
import leftIcon from './left-svgrepo-com.svg';
import rightIcon from './right-svgrepo-com.svg';
export default function Modal(props) {
    return (<div className='modal'>
        <div className="container">
            <img className='close' src={closeIcon} onClick={props.onClose} alt="close"/>
            <img className='button left' alt='back' src={leftIcon} onClick={()=>props.onNavigate(-1)}/>
            <img className='big' src={props.image.urls.small} alt={props.image.alt_description}/>
            <img className='button right' src={rightIcon} onClick={()=>props.onNavigate(1)} alt="next"/>
        </div>
    </div>)
}