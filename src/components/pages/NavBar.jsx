import { Link } from 'react-router';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTitle}>
        <Link to='/'>OZ무비</Link>
      </div>
      <div className={styles.navbarSearch}>
        <input type='text' placeholder='검색' className={styles.input} />
      </div>
      <div className={styles.navbarAuth}>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
