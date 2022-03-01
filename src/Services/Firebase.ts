import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {signOut} from "@firebase/auth";
import { getFirestore,addDoc, collection,query,where,getDocs,deleteDoc,doc,updateDoc } from "firebase/firestore";
import {User} from "@firebase/auth-types";
import {ItemType} from "../modules/Item";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// 회원가입
export function FirebaseSingUp(email:string,password:string){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            addNewuserIntoDB(user as User,password);
            addNewCalendarDataIntoDB(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("이메일 형식이 올바르지 않거나, 비밀번호는 최소 6자 이상으로 해주세요 😃");
        });
}
// 로그인
export function FirebaseLogin(email:string,password:string){
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}
// 로그아웃
export function FirebaseSignOut(){
    signOut(auth);
}


// 현재 로그인 유저 정보 가져오기 user Or null
export function FirebaseGetCurrentLoginedUser(){
    const user = auth.currentUser;
    return user;
}

// 로그인,로그아웃 옵저버 하면서 페이지 이동시키기
export function observeLoginState(callback:()=>void,callback2:()=>void){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // ...
            getCalendarDocId(user.uid);
            callback(); //메인 페이지도 이동함
        } else {
            // User is signed out
            // ...
            callback2(); //로그인 페이지로 이동함
        }
    });
}


interface IUser{
    uid:string;
    displayName:string | null;
    photoURL:string | null;
    email:string | null;
    emailVerified:boolean;
    lastSignInTime:string | undefined;
    password:string;
}
//FireStore 저장 함수들
export async function addNewuserIntoDB(user:User,password:string){
    const newUser:IUser = {
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL,
        email:user.email,
        emailVerified:user.emailVerified,
        lastSignInTime:user.metadata.lastSignInTime,
        password:password
    }
    try {
        const docRef = await addDoc(collection(db, "users"), newUser);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addNewCalendarDataIntoDB(uid:string){
    const docRef = await addDoc(collection(db, 'calendar'),{
        uid
    })
}

export async function getCalendarDocId(uid:string){
    const docRef = collection(db,'calendar');
    const q = query(docRef,where('uid','==',uid));
    const querySnapshot = await getDocs(q);
    let docId = null;
    querySnapshot.forEach((doc)=>{
        docId = doc.id
    })
    return docId;
}

export async function addNewCalendarItemIntoDB(item:ItemType){
    const uid = auth.currentUser?.uid;
    const docId = await getCalendarDocId(uid!);
    await addDoc(collection(db,`calendar/${docId}/items`),item);
}

export async function getAllCalendarItems(){
    const uid = auth.currentUser?.uid;
    const docId = await getCalendarDocId(uid!);
    const itemsRef = collection(db,`calendar/${docId}/items`);
    const querySnapshot = await getDocs(itemsRef);
    const items:ItemType[] = [];
    querySnapshot.forEach((doc)=>{
        items.push(doc.data() as ItemType);
    })
    return items;
}

export async function getTargetItemId(id:number){
    const uid = auth.currentUser?.uid;
    const docId = await getCalendarDocId(uid!);
    const itemsRef = collection(db,`calendar/${docId}/items`);
    const q = query(itemsRef,where('id','==',id));
    const querySnapshot = await getDocs(q);
    let itemId = null;
    querySnapshot.forEach((doc)=>{
        itemId = doc.id
    })
    return itemId;
}

export async function removeCalendarItem(id:number){
    const uid = auth.currentUser?.uid;
    const docId = await getCalendarDocId(uid!);
    const itemId = await getTargetItemId(id);
    if(itemId){
        await deleteDoc(doc(db,`calendar/${docId}/items`,itemId));
    }else{
        console.log('doc 아이디가 없어서 삭제할 수 없습니다.')
    }
}

export async function toggleCalendarItem(id:number,complete:boolean){
    const uid = auth.currentUser?.uid;
    const docId = await getCalendarDocId(uid!);
    const itemId = await getTargetItemId(id);
    if(itemId){
        const docRef = doc(db,`calendar/${docId}/items`,itemId);
        await updateDoc(docRef,{
            complete:!complete
        });
    }else{
        console.log('doc 아이디가 없어서 삭제할 수 없습니다.')
    }
}