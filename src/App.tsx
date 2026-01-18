import { gsap } from 'gsap'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Swiper as SwiperClass } from 'swiper/types'
import './App.scss'

interface CircleItem {
	id: number
	label: string
	title: string
	firstYear: number
	lastYear: number
	content: { year: number; text: string }[]
}

const TestTask: React.FC = () => {
	const items = useMemo<CircleItem[]>(
		() => [
			{
				id: 1,
				label: '1',
				title: 'Технологии',
				firstYear: 1980,
				lastYear: 1986,
				content: [
					{
						year: 1980,
						text: 'Sinclair Research выпускает домашний компьютер ZX80',
					},
				],
			},
			{
				id: 2,
				label: '2',
				title: 'Кино',
				firstYear: 1987,
				lastYear: 1991,
				content: [
					{ year: 1987, text: '"Хищник"/Predator, США (реж. Джон Мактирнан)' },
					{
						year: 1988,
						text: '"Кто подставил кролика Роджера"/Who Framed Roger Rabbit, США (реж. Роберт Земекис)',
					},
					{
						year: 1989,
						text: '"Назад в будущее 2"/Back To The Future, США (реж. Роберт Земекис)',
					},
					{
						year: 1990,
						text: '"Крепкий орешек 2"/Die Hard 2, США (реж. Ренни Харлин)',
					},
					{
						year: 1991,
						text: '"Семейка Аддамс"/The Addams Family, США (реж. Барри Зонненфельд)',
					},
				],
			},
			{
				id: 3,
				label: '3',
				title: 'Литература',
				firstYear: 1992,
				lastYear: 1997,
				content: [
					{
						year: 1992,
						text: 'Нобелевская премия по литературе - Дерек Уолкотт, "за блестящий образ карибского эпоса в 64 разделах"',
					},
					{ year: 1994, text: '"Бессонница" - роман Стивена Кинга' },
					{
						year: 1995,
						text: 'Нобелевская премия по литературе - Шеймас Хини',
					},
				],
			},
			{
				id: 4,
				label: '4',
				title: 'Театр',
				firstYear: 1999,
				lastYear: 2004,
				content: [
					{
						year: 1999,
						text: 'Премьера балета "Золушка" в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона',
					},
					{ year: 2000, text: 'Возобновлено издание журнала "Театр"' },
					{
						year: 2002,
						text: 'Премьера трилогии Тома Стоппарда "Берег Утопии", Королевский Национальный театр, Лондон',
					},
				],
			},
			{
				id: 5,
				label: '5',
				title: 'Спорт',
				firstYear: 2006,
				lastYear: 2014,
				content: [
					{
						year: 2006,
						text: 'Лига чемпионов УЕФА: «Барселона» переиграла в финале «Арсенал» со счётом 2:1',
					},
					{
						year: 2007,
						text: 'Уимблдон — турнир «Большого шлема»',
					},
				],
			},
			{
				id: 6,
				label: '6',
				title: 'Наука',
				firstYear: 2015,
				lastYear: 2022,
				content: [
					{
						year: 2015,
						text: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
					},
					{
						year: 2016,
						text: 'Телескоп "Хаббл" обнаружил самую удалённую из всех галактик, получившую обозначение GN-z11',
					},
					{
						year: 2017,
						text: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
					},
					{
						year: 2018,
						text: 'Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца',
					},
					{
						year: 2019,
						text: 'Google объявил о создании 53-кубитного квантового компьютера',
					},
					{
						year: 2020,
						text: 'Корабль Crew Dragon вернули на Землю из первого пилотируемого полета',
					},
				],
			},
		],
		[],
	)

	const [isBeginning, setIsBeginning] = useState(true)

	const [isEnd, setIsEnd] = useState(false)

	const [isContentVisible, setIsContentVisible] = useState(true)

	const swiperRef = useRef<SwiperClass | null>(null)

	const [activeId, setActiveId] = useState<number>(1)

	const [displayedYear, setDisplayedYear] = useState<number>(1980)

	const [displayedLastYear, setDisplayedLastYear] = useState<number>(1986)

	const currentCategory = items.find(item => item.id === activeId)
	const currentContent = currentCategory?.content || []

	const updateSwiperState = (swiper: SwiperClass) => {
		setIsBeginning(swiper.isBeginning)
		setIsEnd(swiper.isEnd)
	}

	useEffect(() => {
		setIsContentVisible(false)

		const timer = setTimeout(() => {
			setIsContentVisible(true)
		}, 400)

		return () => clearTimeout(timer)
	}, [activeId])

	const yearsRef = useRef({ currentYear: 1980, currentLastYear: 1986 })

	const containerRef = useRef<HTMLDivElement>(null)

	const totalItems = items.length
	const angleStep = 360 / totalItems
	const radius = 268

	const activeIndex = items.findIndex(item => item.id === activeId)
	const targetRotation = activeIndex >= 0 ? -activeIndex * angleStep : 0

	useEffect(() => {
		if (containerRef.current) {
			gsap.to(containerRef.current, {
				rotation: targetRotation,
				duration: 1,
				ease: 'power2.out',
				transformOrigin: 'center center',

				onUpdate: () => {
					const matrix = getComputedStyle(containerRef.current!).transform

					if (matrix && matrix !== 'none') {
						const values = matrix.split('(')[1].split(')')[0].split(',')
						const a = parseFloat(values[0])
						const b = parseFloat(values[1])
						const rad = Math.atan2(b, a)
						const deg = rad * (180 / Math.PI)

						document.documentElement.style.setProperty(
							'--counter-rotate',
							`${-deg}deg`,
						)
					}
				},
			})
		}

		return () => {
			document.documentElement.style.removeProperty('--counter-rotate')
		}
	}, [targetRotation])

	useEffect(() => {
		const currentItem = items.find(item => item.id === activeId)

		if (!currentItem) return

		const startYear = displayedYear
		const startLastYear = displayedLastYear
		const endYear = currentItem.firstYear
		const endLastYear = currentItem.lastYear

		yearsRef.current.currentYear = startYear
		yearsRef.current.currentLastYear = startLastYear

		gsap.to(yearsRef.current, {
			currentYear: endYear,
			currentLastYear: endLastYear,
			duration: 1,
			ease: 'power2.out',
			onUpdate: () => {
				setDisplayedYear(Math.round(yearsRef.current.currentYear))
				setDisplayedLastYear(Math.round(yearsRef.current.currentLastYear))
			},
		})
	}, [activeId, items, displayedYear, displayedLastYear])

	return (
		<div className='main-container'>
			{/* Декоротивная линия */}
			<div className='decoration_line'>
				<h1>Исторические даты</h1>
			</div>
			{/* Вертикальная линия */}
			<div className='line line1'></div>
			{/* Горизонтальная */}
			<div className='line line2'></div>

			{/* Блок с кругом */}
			<div className='circular-selector'>
				{/* Года */}
				<div className='years'>
					<h1>{displayedYear}</h1>
					<h1 className='last_years'>{displayedLastYear}</h1>
				</div>
				{/* Круг */}
				<div className='main-circle'></div>
				{/* Точки по кругу "при наведении показывает номер" и активный круг с номером */}
				<div className='dots-container' ref={containerRef}>
					{items.map((item, index) => {
						const angleDeg = index * angleStep - 60
						const rad = (angleDeg * Math.PI) / 180
						const x = radius * Math.cos(rad)
						const y = radius * Math.sin(rad)

						return (
							<div
								key={item.id}
								className={`dot ${item.id === activeId ? 'active' : ''}`}
								style={{
									left: `calc(50% + ${x}px)`,
									top: `calc(50% + ${y}px)`,
								}}
								onClick={() => setActiveId(item.id)}
							>
								<div className='dot-label'>
									<span>{item.id}</span>
									{item.title && <p className='title'>{item.title}</p>}
								</div>
							</div>
						)
					})}
				</div>
			</div>
			{/* Кнопки для навигации по кругу и контенту */}
			<div className='number_pages-button'>
				{/* Основной блок кнопок с счетчиком */}
				<div className='number_buttons'>
					{/* Счетчик */}
					<p>
						{String(activeId).padStart(2, '0')}/
						{String(items.length).padStart(2, '0')}
					</p>
					{/* Основные кнопки навигации */}
					<div className='buttons'>
						{/* Кнопка назад */}
						<button
							className='back'
							onClick={() => {
								setActiveId(prev => {
									const currentIndex = items.findIndex(item => item.id === prev)
									if (currentIndex > 0) {
										return items[currentIndex - 1].id
									}
									return prev
								})
							}}
							disabled={activeId === items[0]?.id}
						>
							{/* Изображение стрелки */}
							<img src='/arrow.svg' alt='' />
						</button>
						{/* Кнопка вперед */}
						<button
							className='next'
							onClick={() => {
								setActiveId(prev => {
									const currentIndex = items.findIndex(item => item.id === prev)
									if (currentIndex < items.length - 1) {
										return items[currentIndex + 1].id
									}
									return prev
								})
							}}
							disabled={activeId === items[items.length - 1]?.id}
						>
							{/* В стилях развернута на 180 */}
							<img src='/arrow.svg' alt='' />
						</button>
					</div>
				</div>
				{/* Точки навигации (на десктопе не видно) */}
				<div className='pagination-dots'>
					{items.map(item => (
						<button
							key={item.id}
							className={`dot-indicator ${
								item.id === activeId ? 'active' : ''
							}`}
							onClick={() => setActiveId(item.id)}
						/>
					))}
				</div>
			</div>
			{/*Основной блок с контентом по годам  */}
			<div className='content'>
				{/* Блок карусели "Слайдер" */}
				<Swiper
					key={activeId}
					onSwiper={swiper => {
						swiperRef.current = swiper
						updateSwiperState(swiper)
					}}
					onSlideChange={swiper => {
						updateSwiperState(swiper)
					}}
					modules={[Navigation]}
					spaceBetween={80}
					slidesPerView={3}
					navigation={{
						prevEl: '.content .back',
						nextEl: '.content .next',
					}}
					breakpoints={{
						320: {
							spaceBetween: 25,
							slidesPerView: 2,
						},
						1000: {
							spaceBetween: 25,
							slidesPerView: 3,
						},
					}}
					className={`block-carousel ${isContentVisible ? '' : 'no-fade'}`}
				>
					{/* Отображаемый контент, который есть */}
					{isContentVisible
						? currentContent.map((content, index) => (
								<SwiperSlide key={index} className='content-container'>
									<span className='year-title_content'>{content.year}</span>
									<p className='text_content'>{content.text}</p>
								</SwiperSlide>
							))
						: null}
				</Swiper>
				{/* Кнопки навигации по слайдеру */}
				<button className='back' disabled={isBeginning}>
					<img src='/arrow.svg' alt='' />
				</button>
				<button className='next' disabled={isEnd}>
					<img src='/arrow.svg' alt='' />
				</button>
			</div>
		</div>
	)
}

export default TestTask
