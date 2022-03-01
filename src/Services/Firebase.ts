import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {signOut} from "@firebase/auth";
import { getFirestore,addDoc, collection,query,where,getDocs,deleteDoc,doc } from "firebase/firestore";
import {User} from "@firebase/auth-types";
import {ItemType} from "../modules/Item";

const firebaseConfig = {
    apiKey: "AIzaSyChXDQf_930DOI0IfosvtedU52iWLoOgPw",
    authDomain: "my-second-brain-55cc8.firebaseapp.com",
    projectId: "my-second-brain-55cc8",
    storageBucket: "my-second-brain-55cc8.appspot.com",
    messagingSenderId: "1097667023005",
    appId: "1:1097667023005:web:51b107da6752860dd40474",
    measurementId: "G-2HL3YB65GP"
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
            addNewuserIntoDB(user as User);
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

//TODO: 최초 가입시 사용될 db에 회원정보 저장하는 함수

interface IUser{
    uid:string;
    displayName:string | null;
    photoURL:string | null;
    email:string | null;
    emailVerified:boolean;
    lastSignInTime:string | undefined;
}

export async function addNewuserIntoDB(user:User){
    const newUser:IUser = {
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL,
        email:user.email,
        emailVerified:user.emailVerified,
        lastSignInTime:user.metadata.lastSignInTime,
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
        // console.log(doc.data());
        items.push(doc.data() as ItemType);
    })
    return items;
}

export async function getRemoveItemId(id:number){
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
    const itemId = await getRemoveItemId(id);
    console.log(itemId)
    if(itemId){
        await deleteDoc(doc(db,`calendar/${docId}/items`,itemId));
    }else{
        console.log('doc 아이디가 없어서 삭제할 수 없습니다.')
    }

}