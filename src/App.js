import React from "react"; // Importe la bibliothèque React.

import {
  BrowserRouter as Router, // Importe BrowserRouter avec un alias "Router" depuis "react-router-dom".
  Route, // Importe le composant Route de "react-router-dom".
  Switch, // Importe le composant Switch de "react-router-dom" pour le rendu conditionnel des routes.
  Redirect, // Importe le composant Redirect de "react-router-dom" pour les redirections.
} from "react-router-dom";

import { adminRoutes, authRoutes } from "./routes/routes"; // Importe des routes depuis le fichier "./routes/routes".
import Authlayout from "./layout/Authlayout"; // Importe le composant "Authlayout" depuis "./layout/Authlayout".
import Adminlayout from "./layout/Adminlayout"; // Importe le composant "Adminlayout" depuis "./layout/Adminlayout".

// Définit un composant AppRoute, une sorte de wrapper pour les routes.
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component> {/* Rend le composant spécifié avec les propriétés "props". */}
      </Layout>
    )}
    exact // Indique que la route doit correspondre exactement au chemin spécifié.
  ></Route>
);

function App() { // Définit le composant principal de l'application.
  return (
    <Router> {/* Utilise le Router de "react-router-dom" pour gérer les routes. */}
      <Switch> {/* Le Switch permet de faire correspondre une seule route à la fois. */}
      {/* Mappe les routes d'authentification. */}
        {authRoutes.map((route, idx) => ( 
          <AppRoute
            key={idx}
            path={route.path} // Définit le chemin de la route.
            component={route.component} // Définit le composant à rendre.
            layout={Authlayout} 
          />
        ))}
        {/* Mappe les routes d'administration. */}
        {adminRoutes.map((route, idx) => ( 
          <AppRoute
            key={idx}
            path={route.path} // Définit le chemin de la route.
            component={route.component} // Définit le composant à rendre.
            layout={Adminlayout} // 
          />
        ))}
        <Redirect strict from="/" to="/auth/signin" /> {/* Redirige de "/" vers "/auth/signin". */}
      </Switch>
    </Router>
  );
}

export default App; // Exporte le composant "App" pour une utilisation ailleurs.
