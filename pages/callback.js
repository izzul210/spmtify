/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

function Callback() {
	const [artistList, setArtistList] = useState([]);

	useEffect(() => {
		if (window.location.hash) {
			const object = getReturnedParamsFromSpotifyAuth(window.location.hash);
			console.log('object', object);
			getTopTracks(object.access_token);
		}
	}, []);

	const getReturnedParamsFromSpotifyAuth = (hash) => {
		const stringAfterHashtag = hash.substring(1);
		const paramsInUrl = stringAfterHashtag.split('&');
		const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
			const [key, value] = currentValue.split('=');
			accumulater[key] = value;
			return accumulater;
		}, {});

		return paramsSplitUp;
	};

	const getTopTracks = (accessToken) => {
		axios
			.get('https://api.spotify.com/v1/me/top/artists', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			})
			.then((res) => setArtistList(res.data.items));
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<h1>Top Artist</h1>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
				{artistList?.map((artist, id) => (
					<li key={id}>{artist.name}</li>
				))}
			</div>
		</div>
	);
}

export default Callback;
