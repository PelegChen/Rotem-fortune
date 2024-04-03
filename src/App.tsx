import './App.css';
import { useInterval } from './hooks/useInterval.ts';
import React from 'react';
import { characters } from './data/characters.ts';
import { BallsOfLight } from './animations/BallsOfLight/BallsOfLight.tsx';
import { FuturePopup } from './ui/FuturePopup.tsx';
import { useWindowSize } from './hooks/useWindowResize.ts';
import { getImageSource } from './images/getImageSource.ts';

function App() {
    const [bgColor, setBgColor] = React.useState(100);
    const [character, setCharacter] = React.useState(characters[0]);
    const [isPopupOpen, setIsPopupOpen] = React.useState(true);
    const [width] = useWindowSize();
    const selectRef = React.useRef<HTMLSelectElement>(null);

    const translateX = width > 768 ? 0 : (width - 768) / 2;
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
        if (selectRef.current) {
            selectRef.current.value = 'choose';
        }
    };
    return (
        <>
            <div className={'w-screen h-screen overflow-y-hidden bg-black flex flex-col justify-between  text-white font-bold'}>
                <FuturePopup setOpen={setIsPopupOpen} open={isPopupOpen} character={character} />
                <div>


                    <div id={'upper-text-container'} style={{ lineHeight: '105%' }}
                         className={'flex flex-row justify-center  items-center my-4  text-[2rem]'}>
                        <div className={'  flex justify-center items-center flex-row '} dir={'rtl'}>
                            <span> {character.hebrew} </span>
                        </div>

                    </div>
                    <div className={'flex flex-row  justify-center items-center mt-0 mb-7 '} dir={'rtl'}>

                        <select ref={selectRef} defaultValue={'בחרי אחרת'} style={{
                            backgroundColor: 'black',
                            color: 'white',
                        }} onChange={(e) => chooseCharacter(e.target.value)}>
                            <option value={'choose'}> בחרי דמות אחרת</option>
                            {characters.map((char) => {
                                return <option value={char.name} key={char.name}>{char.hebrew}</option>;
                            })}

                        </select>
                    </div>
                </div>
                <div style={{ transform: `translateX(${translateX}px)` }} id={'image-container'} className={`relative max-h-screen flex flex-row justify-center items-start md:w-full  
                       w-[786px]  `}>

                    <div className={'relative'}>
                        <div id={'behind-fortune-teller-container'} className={'absolute p-8   w-full h-full  z-0'}>
                            <div className={' overflow-y-hidden overflow-x-hidden    w-full h-full z-0'}>
                                <BallsOfLight />
                            </div>
                        </div>
                        <div className={'relative z-20'}>
                            <img
                                src={getImageSource(character.name)}
                                style={{ boxShadow: '0 0 20px 4px white' }}
                                alt="fortune teller" className=" h-full  object-scale-down rounded-[7px] z-20" />
                        </div>


                    </div>

                </div>
                <div className={'fixed bottom-16 flex flex-row justify-center items-center pt-10 w-screen'}>
                    <div className={'w-[400px] flex flex-row justify-center items-center'}>


                        <button onClick={() => setIsPopupOpen(true)}
                                className={'bg-violet-800 text-[2rem] flex justify-center items-center w-3/4 rounded-lg p-4'}>
                            {/*{character.isFemale ? 'גלי לי את העתיד' : 'גלה לי את העתיד'}*/}
                            עצה מכדור הקסם
                        </button>
                    </div>
                </div>
                <div id={'spacer'} className={'w-5 h-5'}></div>
            </div>
        </>
    );
}

export default App;
