import React from 'react'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <ul className={styles.social_list}>
            <li><a href="https://www.instagram.com/the_developerfrontend/"><FaInstagram/></a></li>
            <li><a href="https://www.linkedin.com/in/dev-emerson-araujo/"><FaLinkedin/></a></li>
        </ul>
        <p className={styles.copy_right}><span>Costs</span> &copy; 2023</p>
    </footer>
  )
}

export default Footer