import teller from './assets/images/ft_1.png';

import './App.css';

function App() {

    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col  text-white font-bold'}>

                <div id={'upper-text-container'} style={{ lineHeight: '105%' }}
                     className={'flex flex-row justify-center  items-center my-4  text-[2rem]'}>
                    <div className={'  flex justify-center items-center flex-row '} dir={'rtl'}>
                        מגדת העתידות מגדלנה
                    </div>

                </div>
                <div className={'flex flex-row  justify-center items-center my-3 '}  dir={'rtl'}>

                    <select defaultValue={'בחרי אחרת'} style={{backgroundColor : 'black',
                        color :  'white'}}>
                        <option> בחרי אחת אחרת</option>
                        <option>מתילדה </option>
                    </select>
                </div>
                <div id={'image-container'} className={'relative max-h-screen flex flex-row justify-center  bg-violet-400 '}>
                    <div id={'behind-fortune-teller'} className={'absolute p-4 bg-red-400   w-full h-full'}>

                    </div>

                    <img src={teller} style={{ boxShadow: '0 0 20px 4px white' }}
                         alt="fortune teller" className="h-full  object-scale-down rounded-[70px]" />

                </div>
            </div>
        </>
    );
}

export default App;
