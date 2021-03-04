import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb , Button, Select} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import SearchButton from '../SiderItem1/index.js'
import SliderComp from '../SiderItem2/index.js';
import CheckboxGroup from '../SiderItem3/index.js';
import { UserOutlined, LaptopOutlined, EuroOutlined, DingtalkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


import Map from '../Map/Map';
import API from '../API/api';

const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MainPage = () => {
  const [coord, setCoord] = React.useState([26.079038524165203,44.445969301380636]);
  const [apartments, setApartments] = React.useState(null);

  const [changedDropdown, setChangedDropdown] = React.useState(false);

  const handleChange = async (value) => {
    let myLocation = value.split(',');
    setCoord([parseFloat(myLocation[1]), parseFloat(myLocation[0])]);
    setChangedDropdown(true);
  }

  const findApartments = async () => {
    await API(coord[1],coord[0], state.l3, state.l2, true, state.l1, state.string, state.price[0], state.price[1]).then(data => {
      setApartments(data)
    });
  }

  const [state, setState] = React.useState({string:"", price:[350, 700], l1: false, l2: false, l3: false});

  function updateSearch(e) {
    setState({string: e.target.value, priceStart: state.price,l1: state.l1, l2: state.l2, l3: state.l3});
  }

  function updatePrice(e) {
      setState({string: state.string, price: e,l1: state.l1, l2: state.l2, l3: state.l3 });
  }

  function updateLocations(e) {
      if(e.value === 'Nearby parks') {
        setState({string: state.string, priceStart: state.price,l1: e.checked, l2: state.l2, l3: state.l3})
      } else if(e.value === 'Nearby schools') {
        setState({string: state.string, priceStart: state.price,l1: state.l1, l2: e.checked, l3: state.l3})
      } else {
        setState({string: state.string, priceStart: state.price,l1: state.l1, l2: state.l2, l3: e.checked})
      }
  }

React.useEffect(() => {
  if (changedDropdown) {
    findApartments();
  }
  return () => {
    setChangedDropdown(false);
  }
}, [changedDropdown])

  return(
    <>
  <Layout className="layout" style={{position:'relative'}}>
    <Header className="header">
      <div className="logo"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{fontSize: 18, paddingLeft: 120}}>
        <Menu.Item key="1" component={Link} to='/' >For Rental</Menu.Item>
        <Menu.Item key="2" ><Link to="/real-estate">Real Estate</Link></Menu.Item>
      </Menu>
      
      <div className="user-icon"></div>
    </Header>
    <Layout>

      <Sider width={400} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}>

          <MenuItem style={{ marginTop: 30 }}>
            <p style = {{fontSize: 26, marginLeft: 80}}>You can trust us </p>
          </MenuItem>
          <MenuItem>
            <p style = {{fontSize: 26 , marginLeft: 35}}>and go with our locations</p>
          </MenuItem>

          <MenuItem>
            <Select defaultValue="Premium areas" style={{ width: '100%', fontSize: 20 }} onChange={handleChange}>
              <Option value="44.469469,26.0874009">Primaverii</Option>
              <Option value="44.4667487,26.1000011">Floreasca</Option>
              <Option value="44.4702053,26.080564">Herastrau</Option>
              <Option value="44.482511,26.0978721">Aviatiei</Option>
              <Option value="44.4944455,26.0729173">Baneasa</Option>
            </Select>
          </MenuItem>

          <MenuItem>
            <Select defaultValue="Best price areas" style={{ width: '100%', fontSize: 20 }} onChange={handleChange}>
              <Option value="44.4042702,26.0941653">Eroii Revolutiei</Option>
              <Option value="44.3693738,26.1580794">Popesti-Leordeni</Option>
              <Option value="44.4628967,26.1858294">Pantelimon</Option>
            </Select>
          </MenuItem>

          <div style={{display: 'flex', flexDirection: 'column', height: '80%'}}>
            <Menu style={{flexGrow: 1}}>
              <MenuItem style={{marginTop: 25}}>
                <p style = {{fontSize: 26, marginLeft: 80}}>Or you can help us </p>
              </MenuItem>
              <MenuItem>
                <p style = {{fontSize: 26 , marginLeft: 15}}>and find the one that fits you</p>
              </MenuItem>

              <MenuItem>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Pick a spot by moving the marker"></SubMenu>
              </MenuItem>

              <div style={{marginTop: 25}}>
                <div style={{margin: 15, fontSize: 20 }}>
                  <SearchButton  state={state} onChange={updateSearch} />

                  <CheckboxGroup state ={state} onChange={updateLocations} label="Location" perks={['Nearby parks','Nearby schools','Nearby subway stations']} />

                  <SliderComp state={state} onChange={updatePrice} start="350" end="700" />
                </div>
              </div>
            </Menu>

            <Menu>
              <MenuItem>
              <Button style={{width:'100%', marginBottom: 15}} type="primary"  onClick={()=> findApartments()}> Search </Button>
              </MenuItem>

              <MenuItem style={{ margin: 0 }}>
              <Button style={{width:'100%'}}  onClick={()=> setApartments(null)}> Reset </Button>
              </MenuItem>
            </Menu>
          </div>

        </Menu>

      </Sider>
      <Layout style={{ margin:'0px 0px', position:'relative' }}>
        <Content
          className="site-layout-background"
          style={{
            //padding: 24,
            position:'relative',
            margin: 0,
            minHeight: 280,
          }}
        >
          {apartments === null?
            <Map showResults={false} apartments={apartments} setCoord={setCoord} myMarker={coord}/>
            :<Map showResults={true} apartments={apartments}/>
          }
        </Content>
      </Layout>
    </Layout>
  </Layout>
  </>
  );
}

export default MainPage;