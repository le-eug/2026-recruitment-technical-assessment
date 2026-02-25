import styles from './BuildingCard.module.css'

interface BuildingCardProps {
	name: string;
	roomsAvailable: number;
	buildingPicturePath?: string;
}

const BuildingCard = (props: BuildingCardProps) => {
	return (
		<>
			<div>
				<div className={styles.cardStyle}>
					<img alt={props.name} src={props.buildingPicturePath} className={styles.buildingPhoto} />
					<div className={styles.roomCount}>
						<div className={styles.roomDot} />
						<p className={styles.roomText}>
							{props.roomsAvailable} {props.roomsAvailable > 1 ? 'rooms available' : 'room available'}
						</p>
					</div>

					<div className={styles.buildingNameBar}>
						<p className={styles.buildingNameText}>
							{props.name}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default BuildingCard;
