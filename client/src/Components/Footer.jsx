import React from 'react'
import styles from '../Styles/HomeMid.module.css';

const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_top}>
                    <ul>
                        <li><strong>Job seekers</strong></li>
                        <li><p>Browse Jobs</p></li>
                        <li><p>Job Search</p></li>
                        <li><p>Register Now</p></li>
                        <li><p>Login</p></li>
                        <li><p>Create Free Job Alert</p></li>
                    </ul>
                    <ul>
                        <li><strong>Employers</strong></li>
                        <li><p>Recruiter India</p></li>
                        <li><p>Post Jobs</p></li>
                        <li><p>Access Database</p></li>
                    </ul>
                    <ul>
                        <li><strong>Partner Sites</strong></li>
                        <li><p>English Mate</p></li>
                        <li><p>Study Mate</p></li>
                        <li><p>Hindustantimes.com</p></li>
                        <li><p>Livemint.com</p></li>
                        <li><p>Livehindustan.com</p></li>
                    </ul>
                    <ul>
                        <li><strong>Contact us</strong></li>
                        <li><strong>080-47105555</strong></li>
                        <li><p>contactus@shine.com</p></li>
                        <li><strong>Follow us</strong></li>
                        <li>
                            <img src={process.env.PUBLIC_URL + '/shine_images/footer_f&t_logo.png'} alt=""/>
                            <img src={process.env.PUBLIC_URL + '/shine_images/twitter_logo.png'} alt=""/>
                        </li>
                        <li>
                            <div className={styles.download_app}>
                                <div>
                                    <img src={process.env.PUBLIC_URL + '/shine_images/appstore.png'} alt=""/>
                                    <img src={process.env.PUBLIC_URL + '/shine_images/playstore.png'} alt=""/>
                                </div>
                                <div>Download Shine App</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer_base}>
                <div>
                    <span>Feedback</span>
                    |
                    <span>FAQs</span>
                    |
                    <span>About Us</span>
                    |
                    <span>Contact Us</span>
                    |
                    <span>Privacy Policy</span>
                    |
                    <span>Fraud Alert</span>
                    |
                    <span>Business news</span>
                    |
                    <span>English News</span>
                    |
                    <span>Terms & Conditions</span>
                    |
                    <span>Discalimer</span>
                    |
                    <span>Report a Job Posting</span>
                </div>
                <div>
                    <span className={styles.footer_base_right}>&#169; 2020 HT Media Limited</span>
                </div>
            </div>
        </section>
    )
}

export default Footer
