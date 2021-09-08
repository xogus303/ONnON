import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
})

export interface UserType {
    id: string;
    pwd: string;
}

// Atom
export const userState = atom<UserType>({
    key: 'userState',
    default: {
        id: 'xogus303',
        pwd: '12345a',
    },
    effects_UNSTABLE: [persistAtom]
});

// Selector
export const setUserState = selector({
    key: 'SetUserState',
    get: ({get}) => {
        return get(userState).pwd
    }
})