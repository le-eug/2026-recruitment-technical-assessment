import type { SvgIconComponent } from '@mui/icons-material';
import styles from './UtilButtonTemplate.module.css'

interface UtilButtonTemplateProps {
	icon: SvgIconComponent;
	text: string;
}

const UtilButtonTemplate = (props: UtilButtonTemplateProps) => {
	return (
		<>
			<div className={styles.utilButtonStyle}>
				<div className={styles.iconWrapper}>
					<props.icon />
				</div>
				<p className={styles.buttonText}>
					{props.text}
				</p>
			</div>
		</>
	);
}

export default UtilButtonTemplate;
