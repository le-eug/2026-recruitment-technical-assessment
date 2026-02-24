import styles from './MainPage.module.css'
import logo from '../../assets/freeRoomsLogo.png'
import closedLogo from '../../assets/freeroomsDoorClosed.png'
import NavButtonTemplate from '../../components/NavButtonTemplate/NavButtonTemplate';
import SearchIcon from '@mui/icons-material/Search';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MapIcon from '@mui/icons-material/Map';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { act, useState } from 'react';

const MainPage = () => {
	const [openLogo, setOpenLogo] = useState(true);
	const [active, setActive] = useState('grid');

	return (
		<>
			<header className={styles.headerStyle}>
				<div className={styles.titleSide}>
					<div>
						<img
							src={openLogo ? logo : closedLogo}
							alt="Freerooms logo"
							className={styles.logo}
							onClick={() => setOpenLogo(!openLogo)}
						/>
					</div>

					<p className={styles.titleText}>
						Freerooms
					</p>
				</div>

				<div className={styles.navSide}>
					<NavButtonTemplate
						icon={SearchIcon}
						isActive={active === 'search'}
						onClick={() => setActive('search')}
					/>
					<NavButtonTemplate
						icon={GridViewRoundedIcon}
						isActive={active === 'grid'}
						onClick={() => setActive('grid')}
					/>
					<NavButtonTemplate
						icon={MapIcon}
						isActive={active === 'map'}
						onClick={() => setActive('map')}
					/>
					<NavButtonTemplate
						icon={DarkModeIcon}
						isActive={active === 'dark'}
						onClick={() => setActive('dark')}
					/>
				</div>
			</header>
		</>
	);
}

export default MainPage;
