import React from 'react'
import {css} from '@emotion/core'
import PulseLoader from 'react-spinners/PulseLoader'

import './styles.css'

const LoadingPage = ({loading = false}) => {
    const override = css`
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 9999;
        transform: translate(-50%, -50%);
    `
    if (!loading) {
        return null
    }

    return (
        <div className="loading-xx">
            <PulseLoader css={override} size={15} margin={2} color={'#fff'} loading={loading} />
        </div>
    )
}

export default LoadingPage
