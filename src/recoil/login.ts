import { ReactChildren, ReactElement } from 'react';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
})

export interface LoginType {
    show: boolean;
    mode: string;
    MEMBER: number;
}

// Atom
export const loginState = atom<LoginType>({
    key: 'loginState',
    default: {
        show: false,
        mode: 'login',
        MEMBER: 0,
        
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