import './isloading.scss'
import ReactLoading from 'react-loading';

function IsLoading({type}) {
    return ( 
        <div className="loading">
            <div className="loading-item">
                    <ReactLoading type={type}/>
            </div>
        </div>
     );
}

export default IsLoading;