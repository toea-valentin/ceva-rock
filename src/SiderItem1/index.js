import { Input} from 'antd';
import './index.css';

const SearchButton = (props) => {
  
    function updateSearch(event){
      props.onChange(event);
    }
    return(
        <div style = {{ marginBottom: 5 }} className = "sider-sc-button">
          <p style = {{ color: "#909090" }}>Search bar</p>
          
          <Input
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onChange={updateSearch}
          />
        </div>
    );
};

export default SearchButton;