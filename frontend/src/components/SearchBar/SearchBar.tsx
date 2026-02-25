import styles from './SearchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
	return (
		<>
			<label htmlFor='searchbar' className={styles.searchBarWrapper}>
				<SearchIcon className={styles.iconStyle} />
				<input
					id='searchbar'
					className={styles.inputStyle}
					placeholder='Search for a building...' />
			</label>
		</>
	);
}

export default SearchBar;
