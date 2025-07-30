import { Outlet } from 'react-router-dom';
import styled from 'styled-components'

function Layout({searchTerm, setSearchTerm}) {
    return(
        <>
        <NavBar SearchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Main>
            <Outlet/>
        </Main>
        </>
    )
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #a9a9a969;
    padding: 10px 20px;
    margin-bottom: 20px;
    
`
const Button = styled.button`
    background-color: purple;
    color: white;
    border-radius: 15px;
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
`
const SearchBar = styled.input`
    all: unset;
    border-bottom: 2px solid white;
    background-color: black;
    padding: 5px;
    width: 300px;
    height: 35px;
    font-size: 17px;
    color: white;
    
`
const Main = styled.main`
    padding: 20px;
`
function NavBar({searchTerm, setSearchTerm}) {

    return(
        <Header>
            <h1>OZ무비</h1>
            <div className='in-buttons'>
            <SearchBar placeholder='영화를 검색하세요'
            value={searchTerm}
            onChange={(e) => 
            setSearchTerm(e.target.value)
            }></SearchBar>
            <Button>로그인</Button>
            <Button>회원가입</Button>
            
            </div>
        </Header>
        
    )
}

export default  Layout;