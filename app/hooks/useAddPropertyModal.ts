import { create } from "zustand";

interface addPropertyModalStore {
    isOpen: boolean,
    open: () => void
    close: () => void
}

const useAddPropertyModal = create<addPropertyModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true}),
    close: () => set({ isOpen: false})
}))

export default useAddPropertyModal