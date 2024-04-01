import { DialogModal } from './dialog/DialogModal.tsx';
import { fortunes } from '../data/fortunes.ts';
import { builtTextContent } from '../content/builtTextContent.tsx';

export const FuturePopup = ({
                                setOpen,
                                open,
                            }:
                                { setOpen: ((value: boolean) => void), open: boolean }) => {
   const fortune =  fortunes[Math.floor(Math.random() * fortunes.length)] as string;

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
