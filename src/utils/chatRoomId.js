export function getPrivateRoomId(user1,user2){
    let uid1 = user1.uid;
    let uid2 = user2.uid;

    return uid1< uid2 ? `&{uid1}_${uid2}`:`${uid2}_${uid1}`;
}