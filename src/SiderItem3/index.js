import { Checkbox } from 'antd';
import './index.css';

const CheckboxGroup = ( props ) => {

    function onChange(checkedValues) {
        props.onChange(checkedValues.target);
    }
    
    return(
        <>
        <p style = {{fontSize: 20, color: "#909090", padding: 10, margin: "5px 0px 5px 0px"}}> {props.label} </p>
        <div className='check-boxes'>
            {props.perks.map( (option, index) => (
                <Checkbox 
                    className="check-box"
                    style={{marginLeft:'0px', marginBottom: 10, fontSize: 16}}
                    key={index}
                    value={option} 
                    onChange={onChange}>
                    {option} 
                </Checkbox>
            ))}
        </div>
    </>
    )
};

export default CheckboxGroup;