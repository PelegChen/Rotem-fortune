import teller from './assets/images/ft_1.png';

import './App.css';
import { createMagicBallGradient } from './functions/createMagicBallGradient.ts';
import { useInterval } from './hooks/useInterval.ts';
import React from 'react';

function App() {
    const [bgColor, setBgColor] = React.useState(100);

    useInterval(() => {
        if (bgColor >= 255) {
             setBgColor(0);
             return
        }
        setBgColor(bgColor +  5);
    }, 1000);

    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col  text-white font-bold'}>

                <div id={'upper-text-container'} style={{ lineHeight: '105%' }}
                     className={'flex flex-row justify-center  items-center my-4  text-[2rem]'}>
                    <div className={'  flex justify-center items-center flex-row '} dir={'rtl'}>
                        מגדת העתידות מגדלנה
                    </div>

                </div>
                <div className={'flex flex-row  justify-center items-center mt-0 mb-7 '} dir={'rtl'}>

                    <select defaultValue={'בחרי אחרת'} style={{
                        backgroundColor: 'black',
                        color: 'white',
                    }}>
                        <option> בחרי אחת אחרת</option>
                        <option>מתילדה</option>
                    </select>
                </div>
                <div id={'image-container'} className={'relative max-h-screen flex flex-row justify-center  '}>

                    <div className={'relative'}>
                        <div id={'behind-fortune-teller-container'} className={'absolute p-8   w-full h-full  z-0'}>
                            <div style={{ background: createMagicBallGradient(bgColor) }} className={'    w-full h-full z-0'}>

                            </div>
                        </div>
                        <div className={'relative z-20'}>
                            <img src={teller} style={{ boxShadow: '0 0 20px 4px white' }}
                                 alt="fortune teller" className=" h-full  object-scale-down rounded-[70px] z-20" />
                        </div>


                    </div>

                </div>
                <div className={'flex flex-row justify-center items-center pt-10'}>

                <button className={'bg-violet-800 text-[2rem] flex justify-center items-center w-3/4 rounded-lg p-4'}>
                    גלי לי את העתיד
                </button>
                </div>
            </div>
        </>
    );
}

export default App;
