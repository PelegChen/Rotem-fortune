import './App.css';
import { useInterval } from './hooks/useInterval.ts';
import React from 'react';
import { characters } from './data/characters.ts';
import { buildSrcFromChar } from './utils/buildSrcFromChar.ts';
import { BallsOfLight } from './animations/BallsOfLight/BallsOfLight.tsx';
import { FuturePopup } from './ui/FuturePopup.tsx';

function App() {
    const [bgColor, setBgColor] = React.useState(100);
    const [character, setCharacter] = React.useState(characters[0]);
    useInterval(() => {
        if (bgColor >= 255) {
            setBgColor(0);
            return;
        }
        setBgColor(bgColor + 5);
    }, 1000);
    const chooseCharacter = (name: string) => {
        const char = characters.find((char) => char.name === name);
        if (char) {
            setCharacter(char);
        }
    };

    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col  text-white font-bold'}>
                <FuturePopup setOpen={() => {
                }} open={true} />
                <div id={'upper-text-container'} style={{ lineHeight: '105%' }}
                     className={'flex flex-row justify-center  items-center my-4  text-[2rem]'}>
                    <div className={'  flex justify-center items-center flex-row '} dir={'rtl'}>
                        <span> {character.hebrew} </span>
                    </div>

                </div>
                <div className={'flex flex-row  justify-center items-center mt-0 mb-7 '} dir={'rtl'}>

                    <select defaultValue={'בחרי אחרת'} style={{
                        backgroundColor: 'black',
                        color: 'white',
                    }} onChange={(e) => chooseCharacter(e.target.value)}>
                        <option> בחרי אחת אחרת</option>
                        {characters.map((char) => {
                            return <option value={char.name} key={char.name}>{char.hebrew}</option>;
                        })}

                    </select>
                </div>
                <div id={'image-container'} className={'relative max-h-screen flex flex-row justify-center  '}>

                    <div className={'relative'}>
                        <div id={'behind-fortune-teller-container'} className={'absolute p-8   w-full h-full  z-0'}>
                            <div className={' overflow-y-hidden overflow-x-hidden    w-full h-full z-0'}>
                                <BallsOfLight />
                            </div>
                        </div>
                        <div className={'relative z-20'}>
                            <img
                                // src={teller}
                                src={buildSrcFromChar(character)}
                                style={{ boxShadow: '0 0 20px 4px white' }}
                                alt="fortune teller" className=" h-full  object-scale-down rounded-[70px] z-20" />
                        </div>


                    </div>

                </div>
                <div className={'flex flex-row justify-center items-center pt-10'}>

                    <button className={'bg-violet-800 text-[2rem] flex justify-center items-center w-3/4 rounded-lg p-4'}>
                        {character.isFemale ? 'גלי לי את העתיד' : 'גלה לי את העתיד'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
