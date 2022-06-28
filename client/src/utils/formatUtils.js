

export function formatAddress(address){
    let fAdress=address;
    if(address.length>16){
fAdress=address.slice(0,6)+"(...)"+address.slice(-10,address.length)
    }
return fAdress
}