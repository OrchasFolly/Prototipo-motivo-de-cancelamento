import './ButtonPrimary.css'
import { Button } from 'react-bootstrap';

function ButtonPrimary({type ,title, variant, anyEvent = () => {}}) {
    return (
        <Button 
            variant={variant} 
            className="others-styles" 
            type={type} 
            onClick={anyEvent}>
            {title}
        </Button>
    );
}

export default ButtonPrimary