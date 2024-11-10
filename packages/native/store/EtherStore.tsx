import { create } from "zustand";
import { persist } from "zustand/middleware";

export const etherStore = create(
    persist(
        (set,)
    )
)