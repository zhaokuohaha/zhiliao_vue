export default {
    fetch(value){
        return JSON.parse(window.localStorage.getItem(value));
    },
    save(key, value){
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}