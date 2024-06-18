export default function(errorCode){
    switch(errorCode){
        case "auth/invalid-email":
            return "Geçersiz E-posta";

        case "auth/email-already-exists":
            return "Sağlanan e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor.";

        case "auth/user-not-found":
                return "Kullanıcı kaydı bulunamadı.";

        case "auth/weak-password":
                 return "Parola çok Zayıf!";
        case "auth/invalid-credential":
                 return "Böyle bir kullanıcı yok!";
        default:
            return errorCode;
    }
}