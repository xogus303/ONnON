import { atom, selector } from 'recoil';

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
});

// Selector
export const setUserState = selector({
    key: 'SetUserState',
    get: ({get}) => {
        return get(userState).pwd
    }
})