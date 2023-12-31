import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth"
import { ref, set } from "firebase/database"
import { auth, database } from "@/main"

export default {
    actions: {
        async login({ commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                commit("setError", error)
                throw error
            }
        },
        async logout({ commit }) {
            await signOut(auth)
            commit("clearInfo")
        },
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch("getUid")
                set(ref(database, `/users/${uid}/info`), {
                    bill: 10000,
                    name: name
                })
            } catch (error) {
                commit("setError", error)
                throw error
            }
        },
        getUid() {
            const user = auth.currentUser
            return user ? user.uid : null
        }
    }
}
