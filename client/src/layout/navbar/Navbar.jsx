import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Navbar({openSearch,setOpenSearch}) {


    const handleOnpenSearch = () =>{
        setOpenSearch(!openSearch)
        
    }

    return (  
        <div className="nav-container">
            <div className="navbar">
                <span className="logo">.SOCIAL</span>
                <div className="search">
                    <input className="nav-input" placeholder='Search...' type="text" onClick={handleOnpenSearch} />
                    <div className="search-icon">
                        <SearchIcon style={{fontSize:"40px"}}/>
                    </div>
              { openSearch ?
                <div className='data-result'>
                        <div className="data-items">
                            <p>items</p>


                        </div>
                        
                </div>
                :
                <></>
                }

                </div>
                <div className="nav-items">
                    <div className="nav-user">
                        <div className="nav-link">
                            <span>test</span>
                            <span>test</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="menu-icon">
                            <ArrowDropDownIcon/>
                        </div>
                        <div className="menu-options">
                            <div className="menu-items">
                                <p>hello</p>
                                <p>123</p>
                                <p>123</p>
                                <p>123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;