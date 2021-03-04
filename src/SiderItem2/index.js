import { Slider } from 'antd';
import './index.css';

const SliderComp = (props) => { 

    function updatePrice(event){
        props.onChange(event);
      }
    return (
        <>
            <p style = {{fontSize: 20, color: "#909090", padding: 10, margin:"5px 0px 0px 0px"}}> Price range </p>
            <div  className = 'sider-slider'>
            <Slider max={1000} min={300} style = {{ marginBottom: 10 }}  onChange={updatePrice} range defaultValue={[props.start, props.end]}/>    
            </div>
        </>
    );
};

export default SliderComp;