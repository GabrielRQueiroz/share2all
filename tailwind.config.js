module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class',
	important: true,
	theme: {
		extend: {
			margin: {
				320: '320px',
			},
			width: {
				190: '190px',
				275: '275px',
				300: '300px',
				340: '340px',
				350: '350px',
				656: '656px',
				880: '880px',
				508: '508px',
			},
			height: {
				80: '80px',
				340: '340px',
				370: '370px',
				420: '420px',
				510: '510px',
				600: '600px',
				685: '685px',
				800: '800px',
				'90vh': '90vh',
			},
			flex: {
				0.7: '0.7 1 0%',
			},
			maxHeight: {
				370: '370px',
			},
			minWidth: {
				210: '210px',
				350: '350px',
				620: '620px',
			},
			backgroundColor: {
				primary: 'var(--color-bg-primary)',
				secondary: 'var(--color-bg-secondary)',
				button: 'var(--color-bg-button)',
			},
			textColor: {
				accent: 'var(--color-text-accent)',
				primary: 'var(--color-text-primary)',
				button: 'var(--color-text-button)',
				secondary: 'var(--color-text-secondary)',
				dark: 'var(--color-text-dark)',
			},
			keyframes: {
				'slide-in': {
					'0%': {
						'-webkit-transform': 'translateX(-200px)',
						transform: 'translateX(-50vh)',
					},
					'100%': {
						'-webkit-transform': 'translateX(0px)',
						transform: 'translateX(0px)',
					},
				},

				'slide-fwd': {
					'0%': {
						'-webkit-transform': 'translateZ(0px)',
						transform: 'translateZ(0px)',
					},
					'100%': {
						'-webkit-transform': 'translateZ(160px)',
						transform: 'translateZ(160px)',
					},
				},
			},
			animation: {
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
			},
			transitionProperty: {
				height: 'height',
			},
		},
		cursor: {
			'zoom-in': 'zoom-in',
			pointer: 'pointer',
		},
	},
	variants: {
		// backgroundColor: ['active'],
		extend: {},
	},
	plugins: [],
};
