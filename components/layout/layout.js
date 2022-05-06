import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            {/* <div className="header">Header</div> */}
            {children}
            {/* <div className="footer">Footer</div> */}
        </div>
    )
};