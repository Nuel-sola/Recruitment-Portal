

const HTMLContent =  (props) => {
    const { html, style } = props

    // return rawHTMl
    return (
        <div className={`modal-body html-content ${style?.css}`} dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default HTMLContent