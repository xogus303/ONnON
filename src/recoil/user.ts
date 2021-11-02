import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage,
})

export interface UserType {
    id: string;
    pwd: string;
    MEMBER: number;
    NICK: string;
}

// Atom
export const userState = atom<UserType>({
    key: 'userState',
    default: {
        id: '',
        pwd: '',
        MEMBER: 0,
        NICK: '',
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