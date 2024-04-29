import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

function Spinner() {
  return (
    <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
  )
}

export default Spinner


