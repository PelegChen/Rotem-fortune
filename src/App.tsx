import teller from './assets/images/teller_0.jpeg';

import './App.css';

function App() {

    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col'}>
                <div id={'image-container'} className={'max-h-screen flex flex-row justify-center'}>
                    <img src={teller} alt="react logo" className="h-full  object-scale-down" />
                </div>
            </div>
        </>
    );
}

export default App;
