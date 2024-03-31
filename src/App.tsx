import teller from './assets/images/teller_0.jpeg';

import './App.css';

function App() {

    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col'}>

                <div id={'upper-text-container'} style={{ lineHeight: '105%' }}
                     className={'flex flex-row justify-center  items-center my-4  text-[2rem] text-white font-bold'}>
                    <div className={'  flex justify-center items-center flex-row '} dir={'rtl'}>
                        מגדת העתידות מגדלנה
                    </div>

                </div>
                <div>
                    <select>
                        <option>עברית</option>
                        <option>English</option>
                    </select>
                </div>
                <div id={'image-container'} className={'max-h-screen flex flex-row justify-center'}>

                    <img src={teller} style={{ boxShadow: '0 0 20px 4px white' }}
                         alt="fortune teller" className="h-full  object-scale-down rounded-[70px]" />

                </div>
            </div>
        </>
    );
}

export default App;
