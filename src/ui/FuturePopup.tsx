import { DialogModal } from './dialog/DialogModal.tsx';

export const FuturePopup = ({setOpen, open} :
                                {setOpen:  ((value: boolean) => void) , open : boolean}) => {

    return (
        <div>
            <DialogModal setShowDialog={setOpen} showDialog={open}>
                <div
                    className={
                        'flex  h-52 w-80 flex-col justify-between border-2 bg-white p-5'
                    }
                >
                    <div>
                        <p className={'bg-white'}>
                            Are you you want to hard load data?
                        </p>
                    </div>
                    <div className={'flex flex-row gap-4 '}>

                        <button onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </DialogModal>
        </div>
    )
}
