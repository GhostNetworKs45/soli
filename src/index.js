import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Suspense } from "react";
import './i18next';
import { MoralisProvider } from 'react-moralis';

const moralisAppId = 'VxE5zqqPPwUBiOJ4vcYsgA529AVRSg6pJUDI08Jb'
const moralisServerUrl = 'https://wktq1kdcj6ca.usemoralis.com:2053/server'

const App = React.lazy(() => import('./App'));
ReactDOM.render(
    <Suspense fallback={<div className="loading"><img style={{}} src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"/></div>}>
      <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
        <App />
        </MoralisProvider> 
  </Suspense>
  ,
  
  document.getElementById("root")
);
