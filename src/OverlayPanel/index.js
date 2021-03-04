import React from 'react';
import './index.css';
import {Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';


const OverlayPanel = (props) => {
  const {display, setDisplay, data} = props;

  let moreDetails = ['No Fire Alarm', 'Air Conditioning', 'Central Heating', 'Earthquake Safe', 'Recently Renovated', 'Balcony']

  React.useEffect(() => {
    setDisplay(props.display);
  },[props.display]);

  var item1 = moreDetails[Math.floor(Math.random() * moreDetails.length)];
  var index = moreDetails.indexOf(item1);
  if (index > -1) {
    moreDetails.splice(index, 1);
  }
  var item2 = moreDetails[Math.floor(Math.random() * moreDetails.length)];
  index = moreDetails.indexOf(item2);
  if (index > -1) {
    moreDetails.splice(index, 1);
  }
  var item3 = moreDetails[Math.floor(Math.random() * moreDetails.length)];

  return (
    <>
    {props.data !== null? 
    <div className={"panel " + (display ? '' : 'panel-off')} style= {{fontSize: 16}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <h3 style={{marginTop:'5px'}}>About this place</h3>
      <Button type="link" icon={<CloseOutlined />} onClick={()=>setDisplay(false)}/>
      </div>
      <div>{data.name}</div>
      <div>{data.vicinity}</div>
      <div style={{color: '#1890FF', fontSize: 20}}>Price: {data.price}</div>
      <div style={{ height: '1px', width: '150px', backgroundColor: 'gray' }} ></div>
      <div>{item1}</div>
      <div style={{color: '#1890FF'}}>{item2}</div>
      <div style={{color: '#1890FF'}}>{item3}</div>
    </div>
    :<></>
    }
    </>
  );
}

export default OverlayPanel;