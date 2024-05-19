import { DialogModal } from '../library/dialog/DialogModal.tsx';

import { builtTextContent } from '../content/builtTextContent.tsx';
import { buildFortuneBasedOnCharAndDate } from '../content/buildFortuneBasedOnCharAndDate.ts';
import { Character } from '../models/character.ts';

export const FuturePopup = ({
                                setOpen,
                                open,
    character
                            }:
                                { setOpen: ((value: boolean) => void),  open: boolean, character : Character }) => {

    const fortune = buildFortuneBasedOnCharAndDate(character, new Date());
    return (
        <div>
            <DialogModal setShowDialog={setOpen} showDialog={open}>
                <div
                    dir={'rtl'}
                    className={
                        'flex    w-[70vw] flex-col justify-between border-2 bg-white p-7 '
                    }
                >
                    <div>
                        <div className={'bg-white text-[2rem] text-black mb-6'}>
                            {builtTextContent(fortune)}

                        </div>
                    </div>
                    <div className={'flex flex-row gap-4 '}>

                        <button onClick={() => setOpen(false)} className={'p-4 bg-purple-700 hover:bg-purple-900 text-white'}>
                            תודה
                        </button>
                    </div>
                </div>
            </DialogModal>
        </div>
    );
};
