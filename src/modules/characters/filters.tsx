'use client'
import { FC } from 'react'
import styles from './filters.module.scss'

interface FiltersProps {
	onFilterChange: (filters: FilterState) => void
	currentFilters: FilterState
}

export interface FilterState {
	vision: string[]
	weapon: string[]
	rarity: number[]
}

const Filters: FC<FiltersProps> = ({ onFilterChange, currentFilters }) => {
	const visions = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo']
	const weapons = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst']
	const rarities = [4, 5]

	const handleVisionToggle = (vision: string) => {
		const newVisions = currentFilters.vision.includes(vision)
			? currentFilters.vision.filter(v => v !== vision)
			: [...currentFilters.vision, vision]

		onFilterChange({
			...currentFilters,
			vision: newVisions
		})
	}

	const handleWeaponToggle = (weapon: string) => {
		const newWeapons = currentFilters.weapon.includes(weapon)
			? currentFilters.weapon.filter(w => w !== weapon)
			: [...currentFilters.weapon, weapon]

		onFilterChange({
			...currentFilters,
			weapon: newWeapons
		})
	}

	const handleRarityToggle = (rarity: number) => {
		const newRarities = currentFilters.rarity.includes(rarity)
			? currentFilters.rarity.filter(r => r !== rarity)
			: [...currentFilters.rarity, rarity]

		onFilterChange({
			...currentFilters,
			rarity: newRarities
		})
	}

	const getElementColor = (vision: string) => {
		const colors: Record<string, string> = {
			Pyro: '#f64747',
			Hydro: '#4680ff',
			Anemo: '#4fc3a0',
			Electro: '#a757f6',
			Dendro: '#6fb327',
			Cryo: '#98d2e6',
			Geo: '#fab632'
		}
		return colors[vision] || '#ffffff'
	}

	return (
		<div className={styles.filters}>
			<div className={styles.filterGroup}>
				<h3>Элемент</h3>
				<div className={styles.filterButtons}>
					{visions.map(vision => (
						<button
							key={vision}
							className={`${styles.filterButton} ${currentFilters.vision.includes(vision) ? styles.active : ''}`}
							onClick={() => handleVisionToggle(vision)}
							style={{
								'--highlight-color': getElementColor(vision)
							} as React.CSSProperties}
						>
							{vision}
						</button>
					))}
				</div>
			</div>

			<div className={styles.filterGroup}>
				<h3>Оружие</h3>
				<div className={styles.filterButtons}>
					{weapons.map(weapon => (
						<button
							key={weapon}
							className={`${styles.filterButton} ${currentFilters.weapon.includes(weapon) ? styles.active : ''}`}
							onClick={() => handleWeaponToggle(weapon)}
						>
							{weapon}
						</button>
					))}
				</div>
			</div>

			<div className={styles.filterGroup}>
				<h3>Редкость</h3>
				<div className={styles.filterButtons}>
					{rarities.map(rarity => (
						<button
							key={rarity}
							className={`${styles.filterButton} ${currentFilters.rarity.includes(rarity) ? styles.active : ''}`}
							onClick={() => handleRarityToggle(rarity)}
						>
							{'★'.repeat(rarity)}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Filters
