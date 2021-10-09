import {Menu,Layout} from "antd";
import { Link} from "react-router-dom";

const {Header:AntHeader}= Layout;

function Header() {
        return (
            <Layout>
            <AntHeader className="header" style={{backgroundColor:"#D6AD60"}}>
            {/* <Link to="/">
            <img src={logo} alt="Zaza Logo" />
          </Link> */}
            <Menu theme="dark" mode="horizontal" className="header-menu" style={{backgroundColor:"#D6AD60"}}>
              <Menu.Item key="1"><Link to="/">Capital Game</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/flagGame">Flag Game</Link></Menu.Item>
              
              
            </Menu>
            </AntHeader>
            </Layout>
        );
      }
      
      export default Header;