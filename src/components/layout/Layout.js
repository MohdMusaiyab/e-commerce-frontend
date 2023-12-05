import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
  import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,keyword,author,description}) => {
  return (
    <div>
        <Helmet>
            <meta charSet='utf-6'></meta>
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword} />
            <meta name="author" content={author} />
            <title>{title}</title> 
        </Helmet>
       <Header></Header>
        <main style={{minHeight:"70vh"}}>
            <Toaster></Toaster>
        {children}
        </main>
        <Footer>

        </Footer>
    </div>
  )
}
Layout.defaultProps={
    title:"E-commerce App",
    description:"Shop Anything",
    keywords:""
}

export default Layout
