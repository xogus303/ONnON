import { ReactChildren, ReactElement } from 'react';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
})

export interface ModalType {
    show: boolean;
    type: string; // alert, confirm
    title: string;
    text: string;
    okBtn?: string;
    cancelBtn?: string;
    okCallback?: Function;
}

// Atom
export const modalState = atom<ModalType>({
    key: 'modalState',
    default: {
        show: false,
        type: '',
        title: '',
        text: '',
        okBtn: '확인',
        cancelBtn: '취소',
        okCallback: () => {},
    },
    effects_UNSTABLE: [persistAtom]
});

// Selector
// export const setUserState = selector({
//     key: 'SetUserState',
//     get: ({get}) => {
//         return get(userState).pwd
//     }
// })