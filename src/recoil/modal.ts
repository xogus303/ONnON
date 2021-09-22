import { ReactChildren, ReactElement } from 'react';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
})

export interface ModalType {
    show: boolean;
    title: string;
    text: string;
}

// Atom
export const modalState = atom<ModalType>({
    key: 'modalState',
    default: {
        show: false,
        title: '',
        text: '',
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