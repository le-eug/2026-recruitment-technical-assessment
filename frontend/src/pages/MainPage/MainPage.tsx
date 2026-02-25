import styles from './MainPage.module.css'
import logo from '../../assets/freeRoomsLogo.png'
import closedLogo from '../../assets/freeroomsDoorClosed.png'
import NavButtonTemplate from '../../components/NavButtonTemplate/NavButtonTemplate';
import SearchIcon from '@mui/icons-material/Search';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MapIcon from '@mui/icons-material/Map';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
import UtilButtonTemplate from '../../components/UtilButtonTemplate/UtilButtonTemplate';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchBar from '../../components/SearchBar/SearchBar';
import data from '../../../data.json'
import BuildingCard from '../../components/BuildingCard/BuildingCard';

const MainPage = () => {
	const [openLogo, setOpenLogo] = useState(true);
	const [active, setActive] = useState('grid');

	for (const entry of data) {
		console.log(entry);
	}
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

			<div className={styles.bodyWrapper}>
				<div className={styles.body}>
					<div className={styles.bodyTop}>
						<UtilButtonTemplate
							icon={FilterAltIcon}
							text={'Filters'}
						/>
						<SearchBar />
						<UtilButtonTemplate
							icon={FilterListIcon}
							text={'Sort'}
						/>
					</div>

					<div className={styles.bodyGrid}>
						{data.map(building => (
							<BuildingCard
								name={building.name}
								roomsAvailable={building.rooms_available}
								buildingPicturePath={building.building_picture}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default MainPage;
