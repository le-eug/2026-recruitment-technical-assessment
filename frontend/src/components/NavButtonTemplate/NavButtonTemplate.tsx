import type { SvgIconComponent } from '@mui/icons-material';
import styles from './NavButtonTemplate.module.css'

interface TemplateProps {
	icon: SvgIconComponent;
	isActive: boolean;
	onClick: () => void;
}

const NavButtonTemplate = (props: TemplateProps) => {
	return (
		<>
			<button className={props.isActive ? styles.activeStyle : styles.buttonStyle} onClick={props.onClick}>
				<props.icon />
			</button>
		</>
	);
}

export default NavButtonTemplate;
