import { DialogModal } from './dialog/DialogModal.tsx';
import { fortunes } from '../data/fortunes.ts';

export const FuturePopup = ({setOpen, open} :
                                {setOpen:  ((value: boolean) => void) , open : boolean}) => {

    return (
        <div>
            <DialogModal setShowDialog={setOpen} showDialog={open}>
                <div
                    dir={'rtl'}
                    className={
                        'flex  h-96 w-[70vw] flex-col justify-between border-2 bg-white p-7 '
                    }
                >
                    <div>
                        <p className={'bg-white text-[2rem]'}>
                            {fortunes[0].text}
                        </p>
                    </div>
                    <div className={'flex flex-row gap-4 '}>

                        <button onClick={() => setOpen(false)} className={'p-4 bg-green-200 hover:bg-green-400'}>
                            הבנתי
                        </button>
                    </div>
                </div>
            </DialogModal>
        </div>
    )
}
