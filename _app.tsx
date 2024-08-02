import { AppType } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { extendTheme } from '@chakra-ui/react';
import { IBM_Plex_Serif } from 'next/font/google'
const inter = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType<{ admin: boolean; }> = ({ Component, pageProps }) => {
	let themeObj = {};
	if (!pageProps.admin) {
		themeObj = {
			fonts: {
				body: '__IBM_Plex_Serif_7fa7cd, __IBM_Plex_Serif_Fallback_7fa7cd',
				heading: '__IBM_Plex_Serif_7fa7cd, __IBM_Plex_Serif_Fallback_7fa7cd',
				mono: '__IBM_Plex_Serif_7fa7cd, __IBM_Plex_Serif_Fallback_7fa7cd'
			},
			components: {
				Button: {
					defaultProps: {
						colorScheme: 'black',
						variant: 'outline'
					}
				}
			},
			semanticTokens: {
				colors: {
					'chakra-body-bg': {
						_dark: process.env.NEXT_PUBLIC_BG_COLOR,
						_light: process.env.NEXT_PUBLIC_BG_COLOR
					},
					'chakra-body-text': {
						_dark: process.env.NEXT_PUBLIC_BG_COLOR === '#2b2b2b' ? 'white' : 'black',
						_light: process.env.NEXT_PUBLIC_BG_COLOR === '#2b2b2b' ? 'white' : 'black'
					}
				}
			}
		}
	}
	useEffect(() => {
		if (pageProps?.admin) {
			document.body.classList.add('admin')
		} else {
			document.body.classList.remove('admin')
		}
	}, [pageProps])
	const theme = extendTheme(themeObj)
	return (
		<ChakraProvider theme={theme}>
			<DndProvider backend={HTML5Backend}>
				<main className={inter.className} style={{ overflow: 'auto' }}>
					<Component {...pageProps} />
				</main>
				<Analytics />
			</DndProvider>
		</ChakraProvider>
	)
}

export default MyApp;
