import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth } from "firebase/auth";

export function UseGetData(nameCollection, uid) {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [cancelled, setCancelled] = React.useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    React.useEffect(() => {
        async function getUserInfo() {
            checkIfIsCancelled();

            const { currentUser } = getAuth();

            const collectionRef = doc(db, "usuarios", currentUser?.uid);

            setLoading(true);

            try {
                const docRef = await getDoc(collectionRef);

                if (docRef.exists()) {
                    setData(docRef?.data());
                }
            } catch (e) {
                setError(e.message);
            }
        }

        getUserInfo().then(r => console.log(r)).catch(e => console.log(e.message));
    }, [nameCollection, cancelled, uid])

    // React.useEffect(() => {
    //     async function getUserData() {
    //         checkIfIsCancelled();
    //
    //         const collectionRef = await collection(db, nameCollection);
    //
    //         setLoading(true);
    //
    //         try {
    //             const queryUserUid = await query(
    //                 collectionRef,
    //                 where("userId", "==", uid)
    //             );
    //             await onSnapshot(queryUserUid, (querySnapshot) => {
    //                 setData(
    //                     querySnapshot.docs.map((doc) => ({
    //                         id: doc.id,
    //                         ...doc.data(),
    //                     }))
    //                 );
    //             });
    //
    //         } catch (e) {
    //             setError(e.message);
    //         }
    //
    //         setLoading(false);
    //     }
    //
    //     getUserData();
    // }, [nameCollection, cancelled, uid]);

    React.useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        data,
        error,
        loading
    }
}
