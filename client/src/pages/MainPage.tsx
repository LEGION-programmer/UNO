import React from "react"
import MainPageStyle from '../componentsCss/MainPageStyle.module.css'
import JoinRoom from "../components/JoinRoom"

const MainPage = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div>
            <div className={MainPageStyle.bg}>
                <div>
                    <h1 className={MainPageStyle.fontHeader}>Welcome in UNO!</h1>
                </div>
                <div>
                    <JoinRoom />
                </div>
            </div>
            <footer className={MainPageStyle.footerBg}>
                <div className={MainPageStyle.footerBlock}>
                    <p className={MainPageStyle.footerText}>
                        <a href="https://legion-blog.netlify.app/#/" target="_blank" className={MainPageStyle.href}>
                        Copyright © {year} Tomasz Legion Kaczmarek</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default MainPage