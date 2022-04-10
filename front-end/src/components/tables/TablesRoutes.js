import React from 'react'
import { Route, Switch } from 'react-router'
import TablesForm from './TablesForm'

function TablesRoutes() {
  return (
   <>
   <Switch>
     <Route path="/tables/new">
       <TablesForm/>

     </Route>
   </Switch>

   </>
  )
}

export default TablesRoutes