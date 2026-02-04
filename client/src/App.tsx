import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/layout'
import Main from './pages/main'
import Note from './pages/Note'
import Edit from './pages/Edit'



const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Main/>
        },
        {
          path:"/note/:id",
          element:<Note/>
        },
        {
          path:"/note/edit/:id",
          element:<Edit/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
