import React from "react"
import { Link } from "react-router-dom"
import NotFoundStyle from '../componentsCss/NotFoundStyle.module.css'

const NotFound = () => {
    return (
        <div className={NotFoundStyle.NotFoundBg}>
            <h1 className={NotFoundStyle.fontHeader}>Page not found!</h1>
            <Link to="/" className={NotFoundStyle.linkToOtherPage}>Back to main page</Link>
        </div>
    )
}

export default NotFound