import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { validateSession } from '../hooks/validateSession';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

	validateSession();

	return (<>
		<h1>A</h1>
	</>)

}

export default Home
