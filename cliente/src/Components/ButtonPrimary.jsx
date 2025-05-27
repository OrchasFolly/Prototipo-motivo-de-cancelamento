import './ButtonPrimary.css'
import { Button } from 'react-bootstrap';

function ButtonPrimary({type ,title, variant, size, anyEvent = () => {}}) {
    return (
        <Button 
            className="others-styles" 
            variant={variant}
            size={size}
            type={type} 
            onClick={anyEvent}>
            {title}
        </Button>
    );
}

export default ButtonPrimary