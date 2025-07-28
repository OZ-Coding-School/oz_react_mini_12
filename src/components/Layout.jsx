import { Outlet } from 'react-router-dom';
import styled from 'styled-components'

function Layout() {
    return(
        <>
        <NavBar/>
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
const Main = styled.main`
    padding: 20px;
`
function NavBar() {

    return(
        <Header>
            <h1>OZ무비</h1>
            <div className='in-buttons'>
            <Button>로그인</Button>
            <Button>회원가입</Button>
            </div>
        </Header>
        
    )
}

export default  Layout;