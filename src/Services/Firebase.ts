import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {signOut} from "@firebase/auth";

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

// 회원가입
export function FirebaseSingUp(email:string,password:string){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
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
            callback(); //메인 페이지도 이동함
        } else {
            // User is signed out
            // ...
            callback2(); //로그인 페이지로 이동함
        }
    });
}

//TODO: 최초 가입시 사용될 db에 회원정보 저장하는 함수
